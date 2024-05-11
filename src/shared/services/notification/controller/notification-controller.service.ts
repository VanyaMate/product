import {
    INotificationController,
} from '@/shared/services/notification/controller/notification-controller.interface.ts';
import {
    DomainNotification,
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    NotificationNotificatorCallback,
} from '../notificator/notification-notificator.interface';
import {
    INotificationConnector,
    NotificationConnectorConnectOptions,
    NotificationConnectorEvents,
} from '@/shared/services/notification/connector/notification-connector.interface.ts';


export class NotificationControllerService implements INotificationController {
    private readonly _handlers: Record<DomainNotificationType, NotificationNotificatorCallback[]> = {
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
        console.log('Connecting');
        this._setInternalProperties();
        this._emitEvent(DomainNotificationType.CONNECTING, []);
    }

    private _connectorConnectedHandler (response: string) {
        // parse response
        console.log('Connected', response);
        if (response === 'connected') {
            // all ok
        }
        this._reconnectAttempt = 0;
        this._emitEvent(DomainNotificationType.CONNECTED, []);
    }

    private _connectorDisconnectHandler (response: string) {
        console.log('Disconnected', response);
        if (this._notificationConnector.aborted) {
            this._emitEvent(DomainNotificationType.DISCONNECTED, []);
        } else {
            if (this._reconnectAttempt > 1) {
                // parse response
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
        console.log('Message', response);
        // parse response
        // switch by response notification type
    }

    private _setInternalProperties () {
        this._currentNotificationIndex = 0;
        this._reconnectAttempt += 1;
        clearTimeout(this._reconnectTimer);
    }
}