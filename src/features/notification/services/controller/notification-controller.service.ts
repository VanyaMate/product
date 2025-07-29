import {
    DomainNotification,
    DomainNotificationType,
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
    private readonly _handlers: Partial<Record<DomainNotificationType, NotificationNotificatorCallback[]>> = {};

    private _onAllHandlers: Array<NotificationNotificatorCallback> = [];
    private _currentNotificationIndex: number                      = 0;
    private _reconnectTimer: ReturnType<typeof setTimeout>;
    private _reconnectAttempt: number                              = 0;
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

    isConnected (): boolean {
        return this._notificationConnector.status === 'connecting' || this._notificationConnector.status === 'connected';
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
        if (this._handlers[on]) {
            this._handlers[on].push(callback);
        } else {
            this._handlers[on] = [ callback ];
        }
    }

    unsubscribe (on: DomainNotificationType, callback: NotificationNotificatorCallback): void {
        if (this._handlers[on]) {
            this._handlers[on] = this._handlers[on].filter((_callback) => _callback !== callback) ?? [];
        }
    }

    subscribeOnAll (callback: NotificationNotificatorCallback): void {
        this._onAllHandlers.push(callback);
    }

    unsubscribeFromAll (callback: NotificationNotificatorCallback): void {
        this._onAllHandlers.splice(this._onAllHandlers.indexOf(callback), 1);
    }

    emitEvent (event: DomainNotificationType, events: DomainNotification[]): void {
        this._onAllHandlers.forEach((handler) => handler(events));
        this._handlers[event]?.forEach((callback) => callback(events));
    }

    private _connectorConnectingHandler () {
        if (__IS_DEV__) {
            console.log('NOTIFICATION: Connecting');
        }

        this._setBeforeConnectingProps();
        this._notificationHandler(this._notificationParser.getClearNotification(DomainNotificationType.CONNECTING));
    }

    private _connectorConnectedHandler (response: string) {
        if (__IS_DEV__) {
            console.log('NOTIFICATION: Connected', response);
        }

        const potentialError: unknown = jsonParse<unknown>(response);

        if (!isDomainServiceResponseError(potentialError)) {
            const messages: string[]                  = this._notificationParser.getMessages(response);
            const notifications: DomainNotification[] = this._notificationParser.getNotifications(messages);

            this._reconnectAttempt         = 0;
            this._currentNotificationIndex = notifications.length;
            notifications.forEach(this._notificationHandler.bind(this));
        } else {
            this._notificationHandler(this._notificationParser.getClearNotification(DomainNotificationType.ERROR));
        }
    }

    private _connectorDisconnectHandler (response: string) {
        if (__IS_DEV__) {
            console.log('NOTIFICATION: Disconnected', response);
        }

        if (this._notificationConnector.aborted) {
            this._notificationHandler(this._notificationParser.getClearNotification(DomainNotificationType.DISCONNECTED));
        } else {
            if (this._reconnectAttempt > 1) {
                this._notificationHandler(this._notificationParser.getClearNotification(DomainNotificationType.DISCONNECTED));
                this._reconnectTimer = setTimeout(() => {
                    this.connect(this._url, this._getOptions);
                }, 5000);
            } else {
                this.connect(this._url, this._getOptions);
            }
        }
    }

    private _connectorMessageHandler (response: string) {
        const messages: string[] = this._notificationParser.getMessages(response);

        if (__IS_DEV__) {
            console.log('NOTIFICATION: Messages', messages);
        }

        if (messages.length) {
            const notifications: DomainNotification[] = this._notificationParser.getNotifications(messages.slice(this._currentNotificationIndex, messages.length));
            this._currentNotificationIndex            = messages.length;

            if (__IS_DEV__) {
                console.log('NOTIFICATION: MyMessage', notifications);
            }

            notifications.forEach(this._notificationHandler.bind(this));
        }
    }

    private _notificationHandler (notification: DomainNotification) {
        this.emitEvent(notification.type, [ notification ]);
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