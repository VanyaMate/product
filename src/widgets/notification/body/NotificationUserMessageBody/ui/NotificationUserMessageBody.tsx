import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationUserMessageBody.module.scss';
import { IoArrowForward, IoPeople, IoPerson } from 'react-icons/io5';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import {
    getDialoguePageUrl,
} from '@/features/routes/lib/getDialoguePageUrl.ts';
import { getUserPageUrl } from '@/features/routes/lib/getUserPageUrl.ts';
import {
    DomainNotificationUserMessageData,
} from 'product-types/dist/notification/notification-data-types/message/DomainNotificationUserMessageData';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type NotificationShortBodyUserMessageProps =
    {
        data: DomainNotificationUserMessageData;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationUserMessageBody: FC<NotificationShortBodyUserMessageProps> = memo(function NotificationShortBodyUserMessage (props) {
    const { className, data, ...other } = props;
    const { t, replace }                = useTranslation();

    return (
        <section
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <div className={ css.links }>
                <header>
                    <Link
                        aria-label={
                            replace(t.app.go_to_user_page_of, {
                                login: data.message.author.login,
                            })
                        }
                        className={ css.row }
                        to={ getUserPageUrl(data.message.author.login) }
                    >
                        <IoPerson/>
                        <span>{ data.message.author.login }</span>
                    </Link>
                </header>
                <IoArrowForward/>
                <footer>
                    <Link
                        aria-label={
                            replace(t.app.dialogue_page, {
                                dialogue_name: data.dialogue.title,
                            })
                        }
                        className={ css.row }
                        to={ getDialoguePageUrl(data.dialogue.id) }
                    >
                        <IoPeople/>
                        <span>{ data.dialogue.title }</span>
                    </Link>
                </footer>
            </div>
            <p className={ css.message }>
                { data.message.message }
            </p>
        </section>
    );
});