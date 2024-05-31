import React, { useEffect, useState } from 'react';
import {
    DomainNotification,
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    useNotification,
} from '@/features/notification/hooks/useNotification.ts';
import {
    NotificationNotificatorCallback,
} from '@/features/notification/services/notificator/notification-notificator.interface.ts';
import { DomainMessageType } from 'product-types/message/DomainMessage.ts';
import {
    NotificationItem,
} from '@/widgets/notification/item/NotificationItem/ui/NotificationItem.tsx';


export type HomePageContentProps = {};

const HomePage: React.FC<HomePageContentProps> = (props) => {
    const {}                                  = props;
    const notification                        = useNotification('home-page');
    const [ notifications, setNotifications ] = useState<DomainNotification[]>([]);

    useEffect(() => {
        const onMessage: NotificationNotificatorCallback = (message) => {
            setNotifications((prev) => [ ...message.reverse(), ...prev ]);
        };
        notification.subscribe(DomainNotificationType.ERROR, onMessage);
        notification.subscribe(DomainNotificationType.UNKNOWN, onMessage);
        notification.subscribe(DomainNotificationType.CONNECTED, onMessage);
        notification.subscribe(DomainNotificationType.CONNECTING, onMessage);
        notification.subscribe(DomainNotificationType.DISCONNECTED, onMessage);
        notification.subscribe(DomainNotificationType.FRIEND_REQUEST_IN, onMessage);
        notification.subscribe(DomainNotificationType.FRIEND_REQUEST_OUT, onMessage);
        notification.subscribe(DomainNotificationType.FRIEND_DELETED_IN, onMessage);
        notification.subscribe(DomainNotificationType.FRIEND_DELETED_OUT, onMessage);
        notification.subscribe(DomainNotificationType.FRIEND_REQUEST_ACCEPTED_IN, onMessage);
        notification.subscribe(DomainNotificationType.FRIEND_REQUEST_ACCEPTED_OUT, onMessage);
        notification.subscribe(DomainNotificationType.FRIEND_REQUEST_CANCELED_IN, onMessage);
        notification.subscribe(DomainNotificationType.FRIEND_REQUEST_CANCELED_OUT, onMessage);
        notification.subscribe(DomainNotificationType.USER_MESSAGE_IN, onMessage);
        notification.subscribe(DomainNotificationType.USER_MESSAGE_OUT, onMessage);
        notification.subscribe(DomainNotificationType.USER_MESSAGE_READ_IN, onMessage);
        notification.subscribe(DomainNotificationType.USER_MESSAGE_READ_OUT, onMessage);
        notification.subscribe(DomainNotificationType.USER_MESSAGE_DELETED_IN, onMessage);
        notification.subscribe(DomainNotificationType.USER_MESSAGE_DELETED_OUT, onMessage);
        notification.subscribe(DomainNotificationType.USER_MESSAGE_REDACTED_IN, onMessage);
        notification.subscribe(DomainNotificationType.USER_MESSAGE_REDACTED_OUT, onMessage);
        return () => {
            notification.unsubscribe(DomainNotificationType.ERROR, onMessage);
            notification.unsubscribe(DomainNotificationType.UNKNOWN, onMessage);
            notification.unsubscribe(DomainNotificationType.CONNECTED, onMessage);
            notification.unsubscribe(DomainNotificationType.CONNECTING, onMessage);
            notification.unsubscribe(DomainNotificationType.DISCONNECTED, onMessage);
            notification.unsubscribe(DomainNotificationType.FRIEND_REQUEST_IN, onMessage);
            notification.unsubscribe(DomainNotificationType.FRIEND_REQUEST_OUT, onMessage);
            notification.unsubscribe(DomainNotificationType.FRIEND_DELETED_IN, onMessage);
            notification.unsubscribe(DomainNotificationType.FRIEND_DELETED_OUT, onMessage);
            notification.unsubscribe(DomainNotificationType.FRIEND_REQUEST_ACCEPTED_IN, onMessage);
            notification.unsubscribe(DomainNotificationType.FRIEND_REQUEST_ACCEPTED_OUT, onMessage);
            notification.unsubscribe(DomainNotificationType.FRIEND_REQUEST_CANCELED_IN, onMessage);
            notification.unsubscribe(DomainNotificationType.FRIEND_REQUEST_CANCELED_OUT, onMessage);
            notification.unsubscribe(DomainNotificationType.USER_MESSAGE_IN, onMessage);
            notification.unsubscribe(DomainNotificationType.USER_MESSAGE_OUT, onMessage);
            notification.unsubscribe(DomainNotificationType.USER_MESSAGE_READ_IN, onMessage);
            notification.unsubscribe(DomainNotificationType.USER_MESSAGE_READ_OUT, onMessage);
            notification.unsubscribe(DomainNotificationType.USER_MESSAGE_DELETED_IN, onMessage);
            notification.unsubscribe(DomainNotificationType.USER_MESSAGE_DELETED_OUT, onMessage);
            notification.unsubscribe(DomainNotificationType.USER_MESSAGE_REDACTED_IN, onMessage);
            notification.unsubscribe(DomainNotificationType.USER_MESSAGE_REDACTED_OUT, onMessage);
        };
    }, [ notification ]);

    return (
        <div>
            {
                notifications.map((notification) => (
                    <NotificationItem
                        key={ notification.type + notification.creationDate }
                        notification={ notification }
                    />
                ))
            }
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <NotificationItem notification={ {
                id          : '',
                type        : DomainNotificationType.FRIEND_DELETED_OUT,
                viewed      : true,
                creationDate: new Date().toUTCString(),
                data        : {
                    user: {
                        id    : '',
                        login : 'admin',
                        avatar: '',
                    },
                },
            } }/>
            <br/>
            <NotificationItem notification={ {
                id          : '',
                type        : DomainNotificationType.FRIEND_REQUEST_CANCELED_OUT,
                viewed      : true,
                creationDate: new Date().toUTCString(),
                data        : {
                    user     : {
                        id    : '',
                        login : 'admin',
                        avatar: '',
                    },
                    requestId: '',
                    message  : 'Привет. Мы учились вместе',
                },
            } }/>
            <br/>
            <NotificationItem notification={ {
                id          : '',
                type        : DomainNotificationType.FRIEND_REQUEST_ACCEPTED_OUT,
                viewed      : true,
                creationDate: new Date().toUTCString(),
                data        : {
                    user     : {
                        id    : '',
                        login : 'admin',
                        avatar: '',
                    },
                    requestId: '',
                    message  : 'Привет. Мы учились вместе',
                },
            } }/>
            <br/>
            <NotificationItem notification={ {
                id          : '',
                type        : DomainNotificationType.FRIEND_REQUEST_OUT,
                viewed      : true,
                creationDate: new Date().toUTCString(),
                data        : {
                    request  : {
                        user: {
                            id    : '',
                            login : 'admin',
                            avatar: '',
                        },
                    },
                    requestId: '',
                    message  : 'Привет. Мы учились вместе',
                },
            } }/>
            <br/>
            <NotificationItem notification={ {
                id          : '',
                data        : {
                    reason: 'Вышло время',
                    timeMs: 123123,
                },
                creationDate: new Date(Date.now() - 12000).toUTCString(),
                type        : DomainNotificationType.DISCONNECTED,
                viewed      : true,
            } }/>
            <br/>
            <NotificationItem notification={ {
                id          : '',
                data        : 'Токены обновлены',
                creationDate: new Date(Date.now() - 42000).toUTCString(),
                type        : DomainNotificationType.TOKENS_UPDATE,
                viewed      : true,
            } }/>
            <br/>
            <NotificationItem notification={ {
                id          : '',
                data        : '',
                creationDate: new Date(Date.now() - 45000).toUTCString(),
                type        : DomainNotificationType.CONNECTED,
                viewed      : true,
            } }/>
            <br/>
            <NotificationItem notification={ {
                id          : '',
                data        : '',
                creationDate: new Date(Date.now() - 50000).toUTCString(),
                type        : DomainNotificationType.CONNECTING,
                viewed      : true,
            } }/>
            <br/>
            <NotificationItem notification={ {
                id          : '',
                data        : {
                    dialogue: {
                        id      : 'dg123123',
                        title   : 'Dialogue name',
                        avatar  : '',
                        users   : [],
                        messages: [],
                    },
                    message : {
                        id          : 'mes13232',
                        dialogId    : '',
                        message     : 'Привет',
                        redacted    : false,
                        creationDate: new Date().toUTCString(),
                        type        : DomainMessageType.TEXT,
                        author      : {
                            id    : '',
                            avatar: '',
                            login : 'admin',
                        },
                    },
                },
                creationDate: new Date(Date.now() - 350000).toUTCString(),
                type        : DomainNotificationType.USER_MESSAGE_OUT,
                viewed      : true,
            } }/>
            <br/>
            <NotificationItem notification={ {
                id          : '',
                data        : 'Mike Domer',
                creationDate: new Date(Date.now() - 350000).toUTCString(),
                type        : DomainNotificationType.FRIEND_REQUEST_OUT,
                viewed      : false,
            } }/>
            <br/>
            <NotificationItem notification={ {
                id          : '',
                data        : {
                    dialogue: {
                        id      : '',
                        title   : 'Dialogue name',
                        avatar  : '',
                        users   : [],
                        messages: [],
                    },
                    message : {
                        id          : '',
                        dialogId    : '',
                        message     : 'Как дела?',
                        redacted    : false,
                        creationDate: new Date().toUTCString(),
                        type        : DomainMessageType.TEXT,
                        author      : {
                            id    : '',
                            avatar: '',
                            login : 'admin',
                        },
                    },
                },
                creationDate: new Date(Date.now() - 650000).toUTCString(),
                type        : DomainNotificationType.USER_MESSAGE_OUT,
                viewed      : false,
            } }/>
            <br/>
            <NotificationItem notification={ {
                id          : '',
                data        : 'Ошибка авторизации',
                creationDate: new Date(Date.now() - 700000).toUTCString(),
                type        : DomainNotificationType.ERROR,
                viewed      : true,
            } }/>
        </div>
    );
};

export default React.memo(HomePage);