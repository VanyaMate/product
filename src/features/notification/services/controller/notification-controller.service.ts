import {
    DomainNotification,
    DomainNotificationType, isDomainNotification,
} from 'product-types/dist/notification/DomainNotification';
import {
    NotificationNotificatorCallback,
} from '../notificator/notification-notificator.interface.ts';
import {
    isDomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import { jsonParse } from '@/shared/lib/json/json-parse.ts';
import {
    INotificationController,
} from '@/features/notification/services/controller/notification-controller.interface.ts';
import {
    INotificationConnector,
    NotificationConnectorConnectOptions, NotificationConnectorEvents,
} from '@/features/notification/services/connector/notification-connector.interface.ts';
import {
    INotificationParser,
} from '@/features/notification/services/parser/notification-parser.interface.ts';


export class NotificationController implements INotificationController {
    private readonly _handlers: Record<DomainNotificationType, NotificationNotificatorCallback[]> = {
        [DomainNotificationType.ERROR]                  : [],
        [DomainNotificationType.UNKNOWN]                : [],
        [DomainNotificationType.CONNECTED]              : [],
        [DomainNotificationType.CONNECTING]             : [],
        [DomainNotificationType.DISCONNECTED]           : [],
        [DomainNotificationType.TOKENS_UPDATE]          : [],
        [DomainNotificationType.MESSAGE]                : [],
        [DomainNotificationType.MESSAGE_DELETED]        : [],
        [DomainNotificationType.MESSAGE_REDACTED]       : [],
        [DomainNotificationType.MESSAGE_READ]           : [],
        [DomainNotificationType.FRIEND_REQUEST]         : [],
        [DomainNotificationType.FRIEND_REQUEST_ACCEPTED]: [],
        [DomainNotificationType.FRIEND_REQUEST_CANCELED]: [],
    };

    private _currentNotificationIndex: number = 0;
    private _reconnectTimer: ReturnType<typeof setTimeout>;
    private _reconnectAttempt: number         = 0;
    private _url: string;
    private _getOptions: () => NotificationConnectorConnectOptions;

    constructor (
        private readonly _notificationConnector: INotificationConnector,
        private readonly _notificationParser: INotificationParser,
    ) {
        this._notificationConnector.subscribe(NotificationConnectorEvents.CONNECTING, this._connectorConnectingHandler.bind(this));
        this._notificationConnector.subscribe(NotificationConnectorEvents.CONNECTED, this._connectorConnectedHandler.bind(this));
        this._notificationConnector.subscribe(NotificationConnectorEvents.DISCONNECTED, this._connectorDisconnectHandler.bind(this));
        this._notificationConnector.subscribe(NotificationConnectorEvents.MESSAGE, this._connectorMessageHandler.bind(this));
    }

    connect (url: string, getOptions: () => NotificationConnectorConnectOptions): void {
        this._url        = url;
        this._getOptions = getOptions;
        this._notificationConnector.connect(url, getOptions);
    }

    disconnect (): void {
        this._notificationConnector.disconnect();
        this._setDisconnectProps();
    }

    subscribe (on: DomainNotificationType, callback: NotificationNotificatorCallback): void {
        this._handlers[on].push(callback);
    }

    unsubscribe (on: DomainNotificationType, callback: NotificationNotificatorCallback): void {
        this._handlers[on] = this._handlers[on].filter((_callback) => _callback !== callback);
    }

    private _emitEvent (event: DomainNotificationType, events: DomainNotification[]): void {
        this._handlers[event].forEach((callback) => callback(events));
    }

    private _connectorConnectingHandler () {
        if (__IS_DEV__) {
            console.log('NOTIFICATION: Connecting');
        }

        this._setBeforeConnectingProps();
        this._emitEvent(DomainNotificationType.CONNECTING, []);
    }

    private _connectorConnectedHandler (response: string) {
        if (__IS_DEV__) {
            console.log('NOTIFICATION: Connected', response);
        }

        const potentialError: unknown = jsonParse<unknown>(response);

        if (!isDomainServiceResponseError(potentialError)) {
            const [ potentialSuccessConnectMessage ]: string[] = this._notificationParser.getMessages(response);
            const connectNotification: DomainNotification      = this._notificationParser.getNotification(potentialSuccessConnectMessage);

            if (isDomainNotification(connectNotification)) {
                this._reconnectAttempt = 0;
                this._emitEvent(DomainNotificationType.CONNECTED, []);
            }
        }
    }

    private _connectorDisconnectHandler (response: string) {
        if (__IS_DEV__) {
            console.log('NOTIFICATION: Disconnected', response);
        }

        if (this._notificationConnector.aborted) {
            this._emitEvent(DomainNotificationType.DISCONNECTED, []);
        } else {
            if (this._reconnectAttempt > 1) {
                this._emitEvent(DomainNotificationType.DISCONNECTED, []);
                setTimeout(() => {
                    this.connect(this._url, this._getOptions);
                }, 5000);
            } else {
                this.connect(this._url, this._getOptions);
            }
        }
    }

    private _connectorMessageHandler (response: string) {
        const messages: string[] = this._notificationParser.getMessages(response);

        if (messages.length) {
            const notifications: DomainNotification[] = this._notificationParser.getNotifications(messages.slice(this._currentNotificationIndex, messages.length));
            this._currentNotificationIndex            = messages.length;

            if (__IS_DEV__) {
                console.log('NOTIFICATION: Message', notifications);
            }

            notifications.forEach(this._notificationHandler.bind(this));
        }
    }

    private _notificationHandler (notification: DomainNotification) {
        this._emitEvent(notification.type, [ notification ]);
    }

    private _setBeforeConnectingProps () {
        this._currentNotificationIndex = 0;
        this._reconnectAttempt += 1;
        clearTimeout(this._reconnectTimer);
    }

    private _setDisconnectProps () {
        this._currentNotificationIndex = 0;
        this._reconnectAttempt         = 0;
        clearTimeout(this._reconnectTimer);
    }
}