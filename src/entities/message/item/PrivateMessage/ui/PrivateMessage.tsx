import { ComponentPropsWithoutRef, FC, memo, useRef } from 'react';
import classNames from 'classnames';
import css from './PrivateMessage.module.scss';
import dayjs from 'dayjs';
import {
    UserAvatar,
} from '@/entities/user/avatar/UserAvatar/ui/UserAvatar.tsx';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import { IoBuild } from 'react-icons/io5';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { DomainMessage } from 'product-types/dist/message/DomainMessage';
import {
    MessageBody,
} from '@/entities/message/item/MessageBody/ui/MessageBody.tsx';
import 'dayjs/locale/ru.js';


dayjs.extend(localizedFormat);
dayjs.locale('ru');

export type PrivateMessageProps =
    {
        message: DomainMessage;
        userId: string;
        hash: string;
    }
    & ComponentPropsWithoutRef<'article'>;

export const PrivateMessage: FC<PrivateMessageProps> = memo(function PrivateMessage (props) {
    const { className, message, hash, userId, ...other } = props;
    const dayJs                                          = useRef(dayjs(message.creationDate));

    return (
        <article
            { ...other }
            className={ classNames(css.container, {
                [css.target] : hash === `#${ message.id }`,
                [css.me]     : userId === message.author.id,
                [css.notRead]: !message.read,
            }, [ className ]) }
            id={ `m_${ message.id }` }
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
                              dateTime={ message.creationDate }>
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
                    <MessageBody
                        body={ message.message }
                        className={ css.message_content }
                        type={ message.type }
                    />
                </div>
            </div>
        </article>
    );
});