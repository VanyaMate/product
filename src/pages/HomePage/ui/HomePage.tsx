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
    NotificationShortItem,
} from '@/entities/notification/item/NotificationShortItem/ui/NotificationShortItem.tsx';
import {
    useNotification,
} from '@/features/notification/hooks/useNotification.ts';
import {
    NotificationNotificatorCallback,
} from '@/features/notification/services/notificator/notification-notificator.interface.ts';


export type HomePageContentProps = {};

const HomePage: React.FC<HomePageContentProps> = (props) => {
    const {}                                  = props;
    const state                               = useAppSelector(getAuthPending);
    const notification                        = useNotification('home-page');
    const [ notifications, setNotifications ] = useState<DomainNotification[]>([]);

    useEffect(() => {
        const onMessage: NotificationNotificatorCallback = (message) => setNotifications((prev) => [ ...prev, ...message ]);
        notification.subscribe(DomainNotificationType.MESSAGE, onMessage);
        return () => notification.unsubscribe(DomainNotificationType.MESSAGE, onMessage);
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
                data        : 'Токены обновлены',
                creationDate: new Date(Date.now() - 50000).toUTCString(),
                type        : DomainNotificationType.TOKENS_UPDATE,
            } }/>
            <br/>
            <NotificationShortItem notification={ {
                id          : '',
                data        : 'Привет, как дела?',
                creationDate: new Date(Date.now() - 130000).toUTCString(),
                type        : DomainNotificationType.MESSAGE,
            } }/>
            <br/>
            <NotificationShortItem notification={ {
                id          : '',
                data        : 'Mike Domer',
                creationDate: new Date(Date.now() - 350000).toUTCString(),
                type        : DomainNotificationType.FRIEND_REQUEST,
            } }/>
            <br/>
            <NotificationShortItem notification={ {
                id          : '',
                data        : 'У меня норм',
                creationDate: new Date(Date.now() - 650000).toUTCString(),
                type        : DomainNotificationType.MESSAGE,
            } }/>
            <br/>
            <NotificationShortItem notification={ {
                id          : '',
                data        : 'Ошибка авторизации',
                creationDate: new Date(Date.now() - 700000).toUTCString(),
                type        : DomainNotificationType.ERROR,
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