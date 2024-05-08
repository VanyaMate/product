import {
    INotificationService,
    NotificationCallback,
    NotificationServiceCallback,
    NotificationServiceEvents,
} from '@/shared/services/notification/notification-service.interface.ts';
import {
    DomainNotification,
    isDomainNotification,
    NotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    LOCAL_STORAGE_USER_ACCESS_TOKEN,
    LOCAL_STORAGE_USER_REFRESH_TOKEN,
} from '@/app/redux/slices/user/consts/storage.const.ts';


export class AxiosNotificationService implements INotificationService {
    private _status: NotificationServiceEvents = NotificationServiceEvents.DISCONNECTED;
    private _notificationIndex: number         = 0;
    private readonly _uniqueServiceId: string  = Math.random() + '-' + Math.random();
    private readonly _notifyEndpoint: string   = '';

    private readonly _notificationsSubscribers: Record<NotificationType, NotificationCallback[]> = {
        [NotificationType.MESSAGE]                : [],
        [NotificationType.MESSAGE_REDACTED]       : [],
        [NotificationType.MESSAGE_DELETED]        : [],
        [NotificationType.MESSAGE_READ]           : [],
        [NotificationType.FRIEND_REQUEST]         : [],
        [NotificationType.FRIEND_REQUEST_CANCELED]: [],
        [NotificationType.FRIEND_REQUEST_ACCEPTED]: [],
        [NotificationType.CONNECTED]              : [],
        [NotificationType.DISCONNECTED]           : [],
        [NotificationType.TOKENS_UPDATE]          : [],
    };

    private readonly _notificationsServiceSubscribers: Record<NotificationServiceEvents, NotificationServiceCallback[]> = {
        [NotificationServiceEvents.CONNECTED]    : [],
        [NotificationServiceEvents.CONNECTING]   : [],
        [NotificationServiceEvents.DISCONNECTED] : [],
        [NotificationServiceEvents.CONNECT_ERROR]: [],
    };

    public get status (): NotificationServiceEvents {
        return this._status;
    }

    constructor (
        private readonly _API: string,
        private readonly _PATH: string,
    ) {
        this._notifyEndpoint = `${ this._API }/${ this._PATH }`;
        this._connect(this._notifyEndpoint);
    }

    subscribeService (on: NotificationServiceEvents, callback: NotificationServiceCallback): void {
        this._notificationsServiceSubscribers[on].push(callback);
    }

    unsubscribeService (on: NotificationServiceEvents, callback: NotificationServiceCallback): void {
        this._notificationsServiceSubscribers[on] = this._notificationsServiceSubscribers[on].filter((_callback) => _callback !== callback);
    }

    subscribe (on: NotificationType, callback: NotificationCallback): void {
        this._notificationsSubscribers[on].push(callback);
    }

    unsubscribe (on: NotificationType, callback: NotificationCallback): void {
        this._notificationsSubscribers[on] = this._notificationsSubscribers[on].filter((_callback) => _callback !== callback);
    }

    private _connect (url: string): void {
        this._notificationIndex = 0;
        this._status            = NotificationServiceEvents.CONNECTING;

        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('authorization', localStorage.getItem(LOCAL_STORAGE_USER_ACCESS_TOKEN));
        xhr.setRequestHeader('refresh-token', localStorage.getItem(LOCAL_STORAGE_USER_REFRESH_TOKEN));
        xhr.setRequestHeader('id', this._uniqueServiceId.toString());

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                this._notifyServiceSubscribers(NotificationServiceEvents.CONNECTED, 'Connected');
                const messages: string[]                  = this._parseNotifications(xhr.responseText);
                const notifications: DomainNotification[] = messages.map((message) => JSON.parse(message));
                this._notificationIndex                   = notifications.length;
                this._status                              = NotificationServiceEvents.CONNECTED;
            }
        };

        xhr.onerror = (event) => {
            console.log('XHR OnError error', event);
            if (event.eventPhase === EventSource.CLOSED) {
                this._status = NotificationServiceEvents.DISCONNECTED;
                this._notifyServiceSubscribers(NotificationServiceEvents.DISCONNECTED, 'Disconnected');
            } else {
                this._status = NotificationServiceEvents.CONNECT_ERROR;
                this._notifyServiceSubscribers(NotificationServiceEvents.CONNECT_ERROR, 'Error');
            }
        };

        xhr.onloadend = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                const notifications: string[]   = this._parseNotifications(xhr.responseText);
                const lastNotification: unknown = JSON.parse(notifications[this._notificationIndex]);
                if (isDomainNotification(lastNotification)) {
                    switch (lastNotification.type) {
                        case NotificationType.DISCONNECTED:
                            if (lastNotification.data === 'time') {
                                this._connect(this._notifyEndpoint);
                            } else {
                                // notify disconnect
                            }
                            break;
                        case NotificationType.TOKENS_UPDATE:
                            localStorage.setItem(LOCAL_STORAGE_USER_ACCESS_TOKEN, lastNotification.data[0]);
                            localStorage.setItem(LOCAL_STORAGE_USER_REFRESH_TOKEN, lastNotification.data[1]);
                            break;
                        default:
                            console.log('Notify', lastNotification);
                            break;
                    }
                } else {
                    console.log('IsNotValidNotification', lastNotification, notifications);
                }
            }
            //const lastNotification: string = xhr.responseText.match(/{[^{}]*}$/g)?.[0];
            //console.log(JSON.parse(lastNotification));
        };

        xhr.send();
    }

    private _notifyServiceSubscribers (event: NotificationServiceEvents, data: string): void {
        this._notificationsServiceSubscribers[event].forEach((callback) => callback(data));
    }

    private _notifySubscribers (event: NotificationType, data: DomainNotification): void {
        this._notificationsSubscribers[event].forEach((callback) => callback(data));
    }

    private _parseNotifications (response: string): string[] {
        return response.match(/{[^{}]*}$/gm);
    }
}