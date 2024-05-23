import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NotificationUserMessageBody.module.scss';
import {
    DomainNotificationUserMessageData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationUserMessageData';
import { IoArrowForward, IoPeople, IoPerson } from 'react-icons/io5';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import { useTranslation } from 'react-i18next';


export type NotificationShortBodyUserMessageProps =
    {
        data: DomainNotificationUserMessageData;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NotificationUserMessageBody: FC<NotificationShortBodyUserMessageProps> = memo(function NotificationShortBodyUserMessage (props) {
    const { className, data, ...other } = props;
    const { t }                         = useTranslation();

    return (
        <section
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <div className={ css.links }>
                <header>
                    <Link
                        aria-label={ t('profile_page', {
                            ns   : 'site-app',
                            login: data.message.author.login,
                        }) }
                        className={ css.row }
                        to={ `/profile/${ data.message.author.login }` }
                    >
                        <IoPerson/>
                        <span>{ data.message.author.login }</span>
                    </Link>
                </header>
                <IoArrowForward/>
                <footer>
                    <Link
                        aria-label={ t('dialogue_page', {
                            ns           : 'site-app',
                            dialogue_name: data.dialogue.title,
                        }) }
                        className={ css.row }
                        to={ `/dialogue/${ data.dialogue.id }` }
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