import {
    INotificationConnector,
    NotificationConnectorCallback,
    NotificationConnectorConnectOptions,
    NotificationConnectorEvents,
} from '@/shared/services/notification/connector/notification-connector.interface.ts';


export class XhrNotificationConnector implements INotificationConnector {
    private readonly _handlers: Record<NotificationConnectorEvents, NotificationConnectorCallback[]> = {
        [NotificationConnectorEvents.CONNECTED]   : [],
        [NotificationConnectorEvents.CONNECTING]  : [],
        [NotificationConnectorEvents.DISCONNECTED]: [],
        [NotificationConnectorEvents.MESSAGE]     : [],
    };

    private _xhr: XMLHttpRequest;

    public status: NotificationConnectorEvents = NotificationConnectorEvents.DISCONNECTED;
    public aborted: boolean                    = false;

    connect (url: string, getOptions: () => NotificationConnectorConnectOptions): void {
        this._xhr?.abort();
        this._xhr = new XMLHttpRequest();
        this._xhr.open('POST', url, true);

        const options = getOptions();
        this._xhr.setRequestHeader('Cache-Control', 'no-cache');
        this._xhr.setRequestHeader('authorization', options.accessToken);
        this._xhr.setRequestHeader('refresh-token', options.refreshToken);
        this._xhr.setRequestHeader('id', options.id);

        this._xhr.addEventListener('loadstart', this._loadstartHandler.bind(this));
        this._xhr.addEventListener('readystatechange', this._readyStateChangeHandler.bind(this));
        this._xhr.addEventListener('loadend', this._loadendHandler.bind(this));
        this._xhr.addEventListener('error', this._errorHandler.bind(this));
        this._xhr.addEventListener('abort', this._abortHandler.bind(this));
        this._xhr.addEventListener('progress', this._progressHandler.bind(this));

        this._xhr.send();
    }

    disconnect (): void {
        this.aborted = true;
        this._xhr?.abort();
    }

    subscribe (on: NotificationConnectorEvents, callback: NotificationConnectorCallback): void {
        this._handlers[on].push(callback);
    }

    unsubscribe (on: NotificationConnectorEvents, callback: NotificationConnectorCallback): void {
        this._handlers[on] = this._handlers[on].filter((_callback) => _callback !== callback);
    }

    private _emitEvent (event: NotificationConnectorEvents): void {
        this._handlers[event].forEach((callback) => callback(this._xhr.responseText));
    }

    private _loadstartHandler (): void {
        if (this.status !== NotificationConnectorEvents.CONNECTING) {
            this.status = NotificationConnectorEvents.CONNECTING;
            this._emitEvent(NotificationConnectorEvents.CONNECTING);
        }
    }

    private _readyStateChangeHandler (): void {
        if (this._xhr.readyState === 3 && this.status !== NotificationConnectorEvents.CONNECTED) {
            this.status = NotificationConnectorEvents.CONNECTED;
            this._emitEvent(NotificationConnectorEvents.CONNECTED);
        }
    }

    private _loadendHandler (): void {
        if (this.status !== NotificationConnectorEvents.DISCONNECTED) {
            this.status = NotificationConnectorEvents.DISCONNECTED;
            this._emitEvent(NotificationConnectorEvents.DISCONNECTED);
        }
    }

    private _errorHandler (): void {
        if (this.status !== NotificationConnectorEvents.DISCONNECTED) {
            this.status = NotificationConnectorEvents.DISCONNECTED;
            this._emitEvent(NotificationConnectorEvents.DISCONNECTED);
        }
    }

    private _abortHandler (): void {
        if (this.status !== NotificationConnectorEvents.DISCONNECTED) {
            this.status  = NotificationConnectorEvents.DISCONNECTED;
            this._emitEvent(NotificationConnectorEvents.DISCONNECTED);
        }
    }

    private _progressHandler (): void {
        this._emitEvent(NotificationConnectorEvents.MESSAGE);
    }
}