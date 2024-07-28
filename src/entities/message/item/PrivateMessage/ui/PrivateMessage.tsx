import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useLayoutEffect,
    useRef,
} from 'react';
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
import {
    PrivateMessageDropdownButton,
} from '@/widgets/message/PrivateMessageDropdownButton/ui/PrivateMessageDropdownButton.tsx';
import {
    UserPrivateMessageDropdownButton,
} from '@/widgets/message/UserPrivateMessageDropdownButton/ui/UserPrivateMessageDropdownButton.tsx';


dayjs.extend(localizedFormat);
dayjs.locale('ru');

export type PrivateMessageProps =
    {
        message: DomainMessage;
        userId: string;
        onShowMessage?: (messageId: string) => void;
    }
    & ComponentPropsWithoutRef<'article'>;

export const PrivateMessage: FC<PrivateMessageProps> = memo(function PrivateMessage (props) {
    const { className, message, userId, onShowMessage, ...other } = props;
    const dayJs                                                   = useRef(dayjs(message.creationDate));
    const messageRef                                              = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (message.author.id !== userId && messageRef.current && !message.read) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(({ isIntersecting, target }) => {
                    if (isIntersecting) {
                        onShowMessage(message.id);
                        observer.unobserve(target);
                    }
                });
            });

            observer.observe(messageRef.current);
        }
    }, [ message, onShowMessage, userId ]);

    console.log('Private message rerender', message);

    return (
        <article
            { ...other }
            className={ classNames(css.container, {
                [css.me]     : userId === message.author.id,
                [css.notRead]: !message.read,
            }, [ className ]) }
            id={ `m_${ message.id }` }
            ref={ messageRef }
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
                        <time
                            className={ css.date }
                            dateTime={ message.creationDate }
                            key="time"
                        >
                            { dayJs.current.format('LLL') }
                        </time>
                        {
                            message.redacted
                            ? <IoBuild className={ css.redacted }
                                       key="redacted"/>
                            : null
                        }
                        {
                            message.author.id === userId
                            ? <UserPrivateMessageDropdownButton
                                key="dropdown-button"
                                messageId={ message.id }
                            />
                            : <PrivateMessageDropdownButton
                                key="dropdown-button"
                                messageId={ message.id }
                            />
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