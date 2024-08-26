import { ComponentPropsWithoutRef, FC, memo, useRef } from 'react';
import classNames from 'classnames';
import css from './CompanionMessage.module.scss';
import {
    UserAvatar,
} from '@/entities/user/avatar/UserAvatar/ui/UserAvatar.tsx';
import { DomainMessage } from 'product-types/dist/message/DomainMessage';
import { IoBuild } from 'react-icons/io5';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import 'dayjs/locale/ru.js';


dayjs.extend(localizedFormat);
dayjs.locale('ru');


export type CompanionMessageProps =
    {
        message: DomainMessage;
    }
    & ComponentPropsWithoutRef<'article'>;

export const CompanionMessage: FC<CompanionMessageProps> = memo(function CompanionMessage (props) {
    const { className, message, ...other } = props;
    const dayJs                            = useRef(dayjs(message.creationDate));

    return (
        <article
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            id={ message.id }
        >
            <UserAvatar
                avatar={ message.author.avatar }
                className={ css.avatar }
                login={ message.author.login }
            />
            <div className={ css.body }>
                <header className={ css.header }>
                    <Link to={ `/user/${ message.author.login }` }>
                        <h3 className={ css.login }>{ message.author.login }</h3>
                    </Link>
                    <div className={ css.info }>
                        <time className={ css.date }
                              dateTime={ new Date(message.creationDate).toISOString() }>
                            { dayJs.current.format('LLL') }
                        </time>
                        {
                            message.redacted
                            ? <IoBuild className={ css.redacted }/>
                            : null
                        }
                    </div>
                </header>
                <div className={ css.message }>
                    { message.message }
                </div>
            </div>
        </article>
    );
});