import { ComponentPropsWithoutRef, FC, memo, useMemo } from 'react';
import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import {
    NotificationDefaultLayout,
} from '@/widgets/notification/item/NotificationItem/layouts/NotificationDefaultLayout/ui/NotificationDefaultLayout.tsx';
import { IoArrowForward } from 'react-icons/io5';
import {
    NotificationLinkLayout,
} from '@/widgets/notification/item/NotificationItem/layouts/NotificationLinkLayout/ui/NotificationLinkLayout.tsx';
import css from './NotificationPrivateMessageItem.module.scss';
import { getUserPageUrl } from '@/features/routes/lib/getUserPageUrl.ts';
import {
    getDialoguePageUrl,
} from '@/features/routes/lib/getDialoguePageUrl.ts';
import {
    isDomainNotificationPrivateMessageData,
} from 'product-types/dist/notification/notification-data-types/private-message/DomainNotificationPrivateMessageData';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type NotificationUserMessageItemProps =
    {
        notification: DomainNotification;
    }
    & ComponentPropsWithoutRef<'article'>;

export const NotificationPrivateMessageItem: FC<NotificationUserMessageItemProps> = memo(function NotificationUserMessageItem (props) {
    const { className, notification, ...other } = props;
    const { t, replace }                        = useTranslation();
    const linkOnMessageAriaLabel                = useMemo(() => {
        if (isDomainNotificationPrivateMessageData(notification.data)) {
            return replace(t.notifications.message.u_msg_out, {
                user_login   : notification.data.message.author.login,
                dialogue_name: notification.data.dialogue.title,
                message      : notification.data.message.message,
            });
        }
        return '';
    }, [ notification.data, replace, t.notifications.message.u_msg_out ]);
    const linkToMessage                         = useMemo(() => {
        if (isDomainNotificationPrivateMessageData(notification.data)) {
            return `/dialogue/${ notification.data.dialogue.id }#${ notification.data.message.id }`;
        }
        return '#';
    }, [ notification.data ]);


    if (isDomainNotificationPrivateMessageData(notification.data)) {
        return (
            <NotificationLinkLayout
                className={ className }
                linkAria={ linkOnMessageAriaLabel }
                linkTo={ linkToMessage }
                message={ notification.data.message.message }
                notification={ notification }
                outside={
                    <div className={ css.container }>
                        <Link
                            aria-label={ linkOnMessageAriaLabel }
                            to={ getUserPageUrl(notification.data.message.author.login) }
                        >
                            { notification.data.message.author.login }
                        </Link>
                        <IoArrowForward/>
                        <Link
                            aria-label={ replace(t.app.dialogue_page, {
                                login: notification.data.dialogue.title,
                            }) }
                            to={ getDialoguePageUrl(notification.data.dialogue.id) }
                        >
                            { notification.data.dialogue.title || notification.data.dialogue.user.login }
                        </Link>
                    </div>
                }
            />
        );
    } else {
        return (
            <NotificationDefaultLayout
                creationDate={ notification.creationDate }
                type={ notification.type }
                viewed={ true }
                { ...other }
            >
                <p>{ JSON.stringify(notification.data) }</p>
            </NotificationDefaultLayout>
        );
    }
});

