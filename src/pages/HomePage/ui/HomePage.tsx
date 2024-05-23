import React, { useEffect, useState } from 'react';
import {
    getAuthPending,
} from '@/app/redux/slices/auth/selectors/getAuthPending/getAuthPending.ts';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
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
import {
    DomainMessageType,
} from 'product-types/message/DomainMessage.ts';
import {
    NotificationShortItem,
} from '@/widgets/notification/item/NotificationShortItem/ui/NotificationShortItem.tsx';


export type HomePageContentProps = {};

const HomePage: React.FC<HomePageContentProps> = (props) => {
    const {}                                  = props;
    const state                               = useAppSelector(getAuthPending);
    const notification                        = useNotification('home-page');
    const [ notifications, setNotifications ] = useState<DomainNotification[]>([]);

    useEffect(() => {
        const onMessage: NotificationNotificatorCallback       = (message) => setNotifications((prev) => [ ...prev, ...message ]);
        const onFriendRequest: NotificationNotificatorCallback = (message) => setNotifications((prev) => [ ...prev, ...message ]);
        notification.subscribe(DomainNotificationType.USER_MESSAGE, onMessage);
        notification.subscribe(DomainNotificationType.FRIEND_REQUEST, onFriendRequest);
        return () => {
            notification.unsubscribe(DomainNotificationType.USER_MESSAGE, onMessage);
            notification.unsubscribe(DomainNotificationType.FRIEND_REQUEST, onFriendRequest);
        };
    }, [ notification ]);

    return (
        //eslint-disable-next-line i18next/no-literal-string
        <div>
            HomePageComponent { state.toString() }
            { /* eslint-disable-next-line i18next/no-literal-string */ }
            <Button>Any button2</Button>
            <br/>
            <NotificationShortItem notification={ {
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
            <NotificationShortItem notification={ {
                id          : '',
                data        : 'Токены обновлены',
                creationDate: new Date(Date.now() - 42000).toUTCString(),
                type        : DomainNotificationType.TOKENS_UPDATE,
                viewed      : true,
            } }/>
            <br/>
            <NotificationShortItem notification={ {
                id          : '',
                data        : '',
                creationDate: new Date(Date.now() - 45000).toUTCString(),
                type        : DomainNotificationType.CONNECTED,
                viewed      : true,
            } }/>
            <br/>
            <NotificationShortItem notification={ {
                id          : '',
                data        : '',
                creationDate: new Date(Date.now() - 50000).toUTCString(),
                type        : DomainNotificationType.CONNECTING,
                viewed      : true,
            } }/>
            <br/>
            <NotificationShortItem notification={ {
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
                type        : DomainNotificationType.USER_MESSAGE,
                viewed      : true,
            } }/>
            <br/>
            <NotificationShortItem notification={ {
                id          : '',
                data        : 'Mike Domer',
                creationDate: new Date(Date.now() - 350000).toUTCString(),
                type        : DomainNotificationType.FRIEND_REQUEST,
                viewed      : false,
            } }/>
            <br/>
            <NotificationShortItem notification={ {
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
                type        : DomainNotificationType.USER_MESSAGE,
                viewed      : false,
            } }/>
            <br/>
            <NotificationShortItem notification={ {
                id          : '',
                data        : 'Ошибка авторизации',
                creationDate: new Date(Date.now() - 700000).toUTCString(),
                type        : DomainNotificationType.ERROR,
                viewed      : true,
            } }/>
            {
                notifications.map((notification) =>
                    <NotificationShortItem key={ notification.id }
                                           notification={ notification }/>,
                )
            }
        </div>
    );
};

export default React.memo(HomePage);