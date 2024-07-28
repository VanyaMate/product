import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    Suspense,
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import classNames from 'classnames';
import css from './GlobalNotifications.module.scss';
import {
    NotificationNotificatorCallback,
} from '@/features/notification/services/notificator/notification-notificator.interface.ts';
import {
    DomainNotification,
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    useNotification,
} from '@/features/notification/hooks/useNotification.ts';
import {
    NotificationItem,
} from '@/widgets/notification/item/NotificationItem/ui/NotificationItem.tsx';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import {
    useGlobalStoreUpdaterByNotifications,
} from '@/features/notification/hooks/useGlobalStoreUpdaterByNotifications.ts';
import {
    Virtual,
    VirtualType,
} from '@/shared/ui-kit/box/Virtual/ui/Virtual.tsx';


export type GlobalNotificationsProps =
    {}
    & ComponentPropsWithoutRef<'section'>;

export const GlobalNotifications: FC<GlobalNotificationsProps> = memo(function GlobalNotifications (props) {
    const { className, ...other }             = props;
    const notification                        = useNotification('global-notifications');
    const [ notifications, setNotifications ] = useState<DomainNotification[]>([]);
    const audioRef                            = useRef<HTMLAudioElement>(null);

    useGlobalStoreUpdaterByNotifications();

    useLayoutEffect(() => {
        const onMessage: NotificationNotificatorCallback = (message) => {
            setNotifications((prev) => [ ...message.reverse(), ...prev ]);
        };

        const onMessageWithSound: NotificationNotificatorCallback = (message) => {
            setNotifications((prev) => [ ...message.reverse(), ...prev ]);
            if (audioRef.current) {
                audioRef.current.play();
            }
        };

        notification.subscribe(DomainNotificationType.ERROR, onMessage);
        notification.subscribe(DomainNotificationType.UNKNOWN, onMessage);
        notification.subscribe(DomainNotificationType.CONNECTED, onMessage);
        notification.subscribe(DomainNotificationType.CONNECTING, onMessage);
        notification.subscribe(DomainNotificationType.DISCONNECTED, onMessage);

        notification.subscribe(DomainNotificationType.FRIEND_REQUEST_IN, onMessageWithSound);
        notification.subscribe(DomainNotificationType.FRIEND_REQUEST_OUT, onMessageWithSound);
        notification.subscribe(DomainNotificationType.FRIEND_DELETED_IN, onMessageWithSound);
        notification.subscribe(DomainNotificationType.FRIEND_DELETED_OUT, onMessageWithSound);
        notification.subscribe(DomainNotificationType.FRIEND_REQUEST_ACCEPTED_IN, onMessageWithSound);
        notification.subscribe(DomainNotificationType.FRIEND_REQUEST_ACCEPTED_OUT, onMessageWithSound);
        notification.subscribe(DomainNotificationType.FRIEND_REQUEST_CANCELED_IN, onMessageWithSound);
        notification.subscribe(DomainNotificationType.FRIEND_REQUEST_CANCELED_OUT, onMessageWithSound);

        notification.subscribe(DomainNotificationType.USER_MESSAGE_IN, onMessageWithSound);
        notification.subscribe(DomainNotificationType.USER_MESSAGE_OUT, onMessageWithSound);
        notification.subscribe(DomainNotificationType.USER_MESSAGE_READ_IN, onMessageWithSound);
        notification.subscribe(DomainNotificationType.USER_MESSAGE_READ_OUT, onMessageWithSound);
        notification.subscribe(DomainNotificationType.USER_MESSAGE_DELETED_IN, onMessageWithSound);
        notification.subscribe(DomainNotificationType.USER_MESSAGE_DELETED_OUT, onMessageWithSound);
        notification.subscribe(DomainNotificationType.USER_MESSAGE_REDACTED_IN, onMessageWithSound);
        notification.subscribe(DomainNotificationType.USER_MESSAGE_REDACTED_OUT, onMessageWithSound);

        notification.subscribe(DomainNotificationType.PRIVATE_MESSAGE_OUT, onMessageWithSound);
        notification.subscribe(DomainNotificationType.PRIVATE_MESSAGE_IN, onMessageWithSound);

        return () => {
            notification.unsubscribe(DomainNotificationType.ERROR, onMessage);
            notification.unsubscribe(DomainNotificationType.UNKNOWN, onMessage);
            notification.unsubscribe(DomainNotificationType.CONNECTED, onMessage);
            notification.unsubscribe(DomainNotificationType.CONNECTING, onMessage);
            notification.unsubscribe(DomainNotificationType.DISCONNECTED, onMessage);

            notification.unsubscribe(DomainNotificationType.FRIEND_REQUEST_IN, onMessageWithSound);
            notification.unsubscribe(DomainNotificationType.FRIEND_REQUEST_OUT, onMessageWithSound);
            notification.unsubscribe(DomainNotificationType.FRIEND_DELETED_IN, onMessageWithSound);
            notification.unsubscribe(DomainNotificationType.FRIEND_DELETED_OUT, onMessageWithSound);
            notification.unsubscribe(DomainNotificationType.FRIEND_REQUEST_ACCEPTED_IN, onMessageWithSound);
            notification.unsubscribe(DomainNotificationType.FRIEND_REQUEST_ACCEPTED_OUT, onMessageWithSound);
            notification.unsubscribe(DomainNotificationType.FRIEND_REQUEST_CANCELED_IN, onMessageWithSound);
            notification.unsubscribe(DomainNotificationType.FRIEND_REQUEST_CANCELED_OUT, onMessageWithSound);

            notification.unsubscribe(DomainNotificationType.USER_MESSAGE_IN, onMessageWithSound);
            notification.unsubscribe(DomainNotificationType.USER_MESSAGE_OUT, onMessageWithSound);
            notification.unsubscribe(DomainNotificationType.USER_MESSAGE_READ_IN, onMessageWithSound);
            notification.unsubscribe(DomainNotificationType.USER_MESSAGE_READ_OUT, onMessageWithSound);
            notification.unsubscribe(DomainNotificationType.USER_MESSAGE_DELETED_IN, onMessageWithSound);
            notification.unsubscribe(DomainNotificationType.USER_MESSAGE_DELETED_OUT, onMessageWithSound);
            notification.unsubscribe(DomainNotificationType.USER_MESSAGE_REDACTED_IN, onMessageWithSound);
            notification.unsubscribe(DomainNotificationType.USER_MESSAGE_REDACTED_OUT, onMessageWithSound);

            notification.unsubscribe(DomainNotificationType.PRIVATE_MESSAGE_OUT, onMessageWithSound);
            notification.unsubscribe(DomainNotificationType.PRIVATE_MESSAGE_IN, onMessageWithSound);
        };
    }, [ notification ]);

    const notificationRender = useCallback((notification: DomainNotification) => (
        <NotificationItem
            key={ notification.id + notification.type + notification.creationDate }
            notification={ notification }
        />
    ), []);

    return (
        <section
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <audio ref={ audioRef }
                   src="/audio/notification/notification-sound.mp3"/>
            <Suspense fallback={ <PageLoader/> }>
                <Virtual
                    contentClassName={ css.list }
                    distanceToTrigger={ 100 }
                    hasMoreNext={ false }
                    hasMorePrevious={ false }
                    items={ notifications }
                    render={ notificationRender }
                    showAmount={ 30 }
                    type={ VirtualType.TOP }
                />
            </Suspense>
        </section>
    );
});