import { FC, memo } from 'react';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import { DomainMessageType } from 'product-types/message/DomainMessage.ts';
import {
    NotificationItem,
} from '@/widgets/notification/item/NotificationItem/ui/NotificationItem.tsx';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import {
    GlobalNotifications,
} from '@/widgets/notification/GlobalNotifications/ui/GlobalNotifications.tsx';


export type HomePageContentProps = {};

const HomePage: FC<HomePageContentProps> = (props) => {
    const {} = props;

    return (
        <Col>
            <GlobalNotifications/>
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
        </Col>
    );
};

export default memo(HomePage);