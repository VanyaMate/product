import React from 'react';
import {
    getAuthPending,
} from '@/app/redux/slices/auth/selectors/getAuthPending/getAuthPending.ts';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    NotificationShortItem,
} from '@/entities/notification/item/NotificationShortItem/ui/NotificationShortItem.tsx';


export type HomePageContentProps = {};

const HomePage: React.FC<HomePageContentProps> = (props) => {
    const {}    = props;
    const state = useAppSelector(getAuthPending);

    return (
        //eslint-disable-next-line i18next/no-literal-string
        <div>
            HomePageComponent { state.toString() }
            { /* eslint-disable-next-line i18next/no-literal-string */ }
            <Button>Any button2</Button>
            <br/>
            <NotificationShortItem notification={ {
                data  : 'Токены обновлены',
                dateMs: 123123,
                type  : DomainNotificationType.TOKENS_UPDATE,
            } }/>
            <br/>
            <NotificationShortItem notification={ {
                data  : 'Привет, как дела?',
                dateMs: 123123,
                type  : DomainNotificationType.MESSAGE,
            } }/>
            <br/>
            <NotificationShortItem notification={ {
                data  : 'Mike Domer',
                dateMs: 123123,
                type  : DomainNotificationType.FRIEND_REQUEST,
            } }/>
            <br/>
            <NotificationShortItem notification={ {
                data  : 'У меня норм',
                dateMs: 123123,
                type  : DomainNotificationType.MESSAGE,
            } }/>
            <br/>
            <NotificationShortItem notification={ {
                data  : 'Ошибка авторизации',
                dateMs: 123123,
                type  : DomainNotificationType.ERROR,
            } }/>
        </div>
    );
};

export default React.memo(HomePage);