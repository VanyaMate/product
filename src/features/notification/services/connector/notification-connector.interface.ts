export enum NotificationConnectorEvents {
    CONNECTED    = 'connected',
    CONNECTING   = 'connecting',
    DISCONNECTED = 'disconnected',
    MESSAGE      = 'message',
}

export type NotificationConnectorCallback = (response: string) => void;
export type NotificationConnectorConnectOptions = {
    accessToken: string;
    refreshToken: string;
    id: string;
}

export interface INotificationConnector {
    aborted: boolean;
    status: NotificationConnectorEvents;

    connect (url: string, getOptions: () => NotificationConnectorConnectOptions): void;

    disconnect (): void;

    subscribe (on: NotificationConnectorEvents, callback: NotificationConnectorCallback): void;

    unsubscribe (on: NotificationConnectorEvents, callback: NotificationConnectorCallback): void;
}