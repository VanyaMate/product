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
    private readonly _handlers: Record<DomainNotificationType, NotificationNotificatorCallback[]> = {
        [DomainNotificationType.ERROR]                          : [],
        [DomainNotificationType.UNKNOWN]                        : [],
        [DomainNotificationType.CONNECTED]                      : [],
        [DomainNotificationType.CONNECTING]                     : [],
        [DomainNotificationType.DISCONNECTED]                   : [],
        [DomainNotificationType.TOKENS_UPDATE]                  : [],
        [DomainNotificationType.USER_MESSAGE_IN]                : [],
        [DomainNotificationType.USER_MESSAGE_OUT]               : [],
        [DomainNotificationType.USER_MESSAGE_DELETED_IN]        : [],
        [DomainNotificationType.USER_MESSAGE_DELETED_OUT]       : [],
        [DomainNotificationType.USER_MESSAGE_REDACTED_IN]       : [],
        [DomainNotificationType.USER_MESSAGE_REDACTED_OUT]      : [],
        [DomainNotificationType.USER_MESSAGE_READ_IN]           : [],
        [DomainNotificationType.USER_MESSAGE_READ_OUT]          : [],
        [DomainNotificationType.FRIEND_REQUEST_IN]              : [],
        [DomainNotificationType.FRIEND_REQUEST_OUT]             : [],
        [DomainNotificationType.FRIEND_DELETED_IN]              : [],
        [DomainNotificationType.FRIEND_DELETED_OUT]             : [],
        [DomainNotificationType.FRIEND_REQUEST_ACCEPTED_IN]     : [],
        [DomainNotificationType.FRIEND_REQUEST_ACCEPTED_OUT]    : [],
        [DomainNotificationType.FRIEND_REQUEST_CANCELED_IN]     : [],
        [DomainNotificationType.FRIEND_REQUEST_CANCELED_OUT]    : [],
        [DomainNotificationType.PRIVATE_MESSAGE_IN]             : [],
        [DomainNotificationType.PRIVATE_MESSAGE_OUT]            : [],
        [DomainNotificationType.PRIVATE_MESSAGE_DELETED_IN]     : [],
        [DomainNotificationType.PRIVATE_MESSAGE_DELETED_OUT]    : [],
        [DomainNotificationType.PRIVATE_MESSAGE_REDACTED_IN]    : [],
        [DomainNotificationType.PRIVATE_MESSAGE_REDACTED_OUT]   : [],
        [DomainNotificationType.PRIVATE_MESSAGE_READ_IN]        : [],
        [DomainNotificationType.PRIVATE_MESSAGE_READ_OUT]       : [],
        [DomainNotificationType.PRIVATE_MESSAGE_READ_ALL_IN]    : [],
        [DomainNotificationType.PRIVATE_MESSAGE_READ_ALL_OUT]   : [],
        [DomainNotificationType.DIALOGUE_CREATED_IN]            : [],
        [DomainNotificationType.DIALOGUE_CREATED_OUT]           : [],
        [DomainNotificationType.DIALOGUE_UPDATED_IN]            : [],
        [DomainNotificationType.DIALOGUE_UPDATED_OUT]           : [],
        [DomainNotificationType.DIALOGUE_DELETED_IN]            : [],
        [DomainNotificationType.DIALOGUE_DELETED_OUT]           : [],
        [DomainNotificationType.DIALOGUE_ARCHIVED_IN]           : [],
        [DomainNotificationType.DIALOGUE_ARCHIVED_OUT]          : [],
        [DomainNotificationType.PRIVATE_DIALOGUE_CREATED_IN]    : [],
        [DomainNotificationType.PRIVATE_DIALOGUE_CREATED_OUT]   : [],
        [DomainNotificationType.PRIVATE_DIALOGUE_UPDATED_IN]    : [],
        [DomainNotificationType.PRIVATE_DIALOGUE_UPDATED_OUT]   : [],
        [DomainNotificationType.PRIVATE_DIALOGUE_DELETED_IN]    : [],
        [DomainNotificationType.PRIVATE_DIALOGUE_DELETED_OUT]   : [],
        [DomainNotificationType.PRIVATE_DIALOGUE_UNDELETED_IN]  : [],
        [DomainNotificationType.PRIVATE_DIALOGUE_UNDELETED_OUT] : [],
        [DomainNotificationType.PRIVATE_DIALOGUE_ARCHIVED_IN]   : [],
        [DomainNotificationType.PRIVATE_DIALOGUE_ARCHIVED_OUT]  : [],
        [DomainNotificationType.PRIVATE_DIALOGUE_UNARCHIVED_IN] : [],
        [DomainNotificationType.PRIVATE_DIALOGUE_UNARCHIVED_OUT]: [],
        [DomainNotificationType.POST_CREATED_IN]                : [],
        [DomainNotificationType.POST_CREATED_OUT]               : [],
        [DomainNotificationType.POST_UPDATED_IN]                : [],
        [DomainNotificationType.POST_UPDATED_OUT]               : [],
        [DomainNotificationType.POST_DELETED_IN]                : [],
        [DomainNotificationType.POST_DELETED_OUT]               : [],
        [DomainNotificationType.FILE_UPLOADED_IN]               : [],
        [DomainNotificationType.FILE_UPLOADED_OUT]              : [],
        [DomainNotificationType.FILE_UPDATED_IN]                : [],
        [DomainNotificationType.FILE_UPDATED_OUT]               : [],
        [DomainNotificationType.FILE_DELETED_IN]                : [],
        [DomainNotificationType.FILE_DELETED_OUT]               : [],
        [DomainNotificationType.LANGUAGE_CREATED_IN]            : [],
        [DomainNotificationType.LANGUAGE_CREATED_OUT]           : [],
        [DomainNotificationType.LANGUAGE_UPDATED_IN]            : [],
        [DomainNotificationType.LANGUAGE_UPDATED_OUT]           : [],
        [DomainNotificationType.LANGUAGE_DELETED_IN]            : [],
        [DomainNotificationType.LANGUAGE_DELETED_OUT]           : [],
        [DomainNotificationType.LANGUAGE_FOLDER_CREATED_IN]     : [],
        [DomainNotificationType.LANGUAGE_FOLDER_CREATED_OUT]    : [],
        [DomainNotificationType.LANGUAGE_FOLDER_UPDATED_IN]     : [],
        [DomainNotificationType.LANGUAGE_FOLDER_UPDATED_OUT]    : [],
        [DomainNotificationType.LANGUAGE_FOLDER_DELETED_IN]     : [],
        [DomainNotificationType.LANGUAGE_FOLDER_DELETED_OUT]    : [],
        [DomainNotificationType.LANGUAGE_WORD_CREATED_IN]       : [],
        [DomainNotificationType.LANGUAGE_WORD_CREATED_OUT]      : [],
        [DomainNotificationType.LANGUAGE_WORD_UPDATED_IN]       : [],
        [DomainNotificationType.LANGUAGE_WORD_UPDATED_OUT]      : [],
        [DomainNotificationType.LANGUAGE_WORD_DELETED_IN]       : [],
        [DomainNotificationType.LANGUAGE_WORD_DELETED_OUT]      : [],
        [DomainNotificationType.USER_AVATAR_UPDATE_IN]          : [],
        [DomainNotificationType.USER_AVATAR_UPDATE_OUT]         : [],
        [DomainNotificationType.USER_LOGIN_UPDATE_IN]           : [],
        [DomainNotificationType.USER_LOGIN_UPDATE_OUT]          : [],
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
        this._handlers[on]?.push(callback);
    }

    unsubscribe (on: DomainNotificationType, callback: NotificationNotificatorCallback): void {
        this._handlers[on] = this._handlers[on]?.filter((_callback) => _callback !== callback) ?? [];
    }

    private _emitEvent (event: DomainNotificationType, events: DomainNotification[]): void {
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