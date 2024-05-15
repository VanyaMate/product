import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useCallback,
    useEffect,
    useState,
} from 'react';
import classNames from 'classnames';
import css from './TestingNotificationList.module.scss';
import {
    useNotification,
} from '@/features/notification/hooks/useNotification.ts';
import {
    DomainNotification,
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    TestingNotificationItem,
} from '@/features/notification/ui/TestingNotificationItem/ui/TestingNotificationItem.tsx';
import {
    NotificationNotificatorCallback,
} from '@/features/notification/services/notificator/notification-notificator.interface.ts';


export type TestingNotificationListProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const TestingNotificationList: FC<TestingNotificationListProps> = memo(function TestingNotificationList (props) {
    const { className, ...other }             = props;
    const notificationService                 = useNotification('testing-list');
    const [ notifications, setNotifications ] = useState<DomainNotification[]>([]);
    const addNotifications                    = useCallback<NotificationNotificatorCallback>((notification) => setNotifications((prev) => [ ...prev, ...notification ]), []);

    useEffect(() => {
        notificationService.subscribe(DomainNotificationType.MESSAGE, addNotifications);
        return () => notificationService.unsubscribe(DomainNotificationType.MESSAGE, addNotifications);
    }, [ addNotifications, notificationService ]);

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <div className={ css.content }>
                {
                    notifications.map((notification) =>
                        <TestingNotificationItem key={ notification.dateMs }
                                                 notification={ notification }/>,
                    )
                }
            </div>
        </div>
    );
});