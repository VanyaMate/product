export enum NotificationConnectorEvents {
    CONNECTED  = 'connected',
    CONNECTING = 'connecting',
    DISCONNECT = 'disconnect',
    MESSAGE    = 'message',
}

export type NotificationConnectorCallback = (response: string) => void;
export type NotificationConnectorConnectOptions = {
    accessToken: string;
    refreshToken: string;
    id: string;
}

export interface INotificationConnector {
    status: NotificationConnectorEvents;

    connect (url: string, options: NotificationConnectorConnectOptions): void;

    subscribe (on: NotificationConnectorEvents, callback: NotificationConnectorCallback): void;

    unsubscribe (on: NotificationConnectorEvents, callback: NotificationConnectorCallback): void;
}