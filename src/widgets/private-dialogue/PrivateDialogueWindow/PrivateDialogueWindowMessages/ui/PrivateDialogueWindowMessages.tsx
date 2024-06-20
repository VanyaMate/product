import { ComponentPropsWithoutRef, FC, memo, useEffect, useRef } from 'react';
import classNames from 'classnames';
import css from './PrivateDialogueWindowMessages.module.scss';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import {
    getAuthUser,
} from '@/app/redux/slices/auth/selectors/getAuthUser/getAuthUser.ts';
import {
    PrivateMessage,
} from '@/entities/message/item/PrivateMessage/ui/PrivateMessage.tsx';
import { useLocation } from 'react-router-dom';
import {
    usePrivateDialogueMessagesLoaderTrigger,
} from '@/features/private-dialogue/hooks/usePrivateDialogueMessagesLoaderTrigger/usePrivateDialogueMessagesLoaderTrigger.ts';


export type PrivateDialogueWindowMessagesProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateDialogueWindowMessages: FC<PrivateDialogueWindowMessagesProps> = memo(function PrivateDialogueWindowMessages (props) {
    const { className, dialogueId, ...other } = props;
    const messages                            = useAppSelector((state) => state.privateMessages);
    const searchMessages                      = useAppSelector((state) => state.privateMessagesSearch);
    const userData                            = useAppSelector(getAuthUser);
    const { hash }                            = useLocation();
    const container                           = useRef<HTMLDivElement>(null);

    // TODO: Переделать этот ужас со скроллами

    useEffect(() => {
        if (hash && container.current) {
            const element: HTMLElement = container.current.querySelector(`#m_${ hash.substring(1) }`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                element.focus();
            } else {
                // TODO
                // loading messages
                // scroll to message
            }
        }
    }, [ hash ]);

    useEffect(() => {
        if (container.current && dialogueId && messages[dialogueId]) {
            const { clientHeight, scrollHeight, scrollTop } = container.current;
            const scrollPlaceInBottom                       = scrollHeight - clientHeight - scrollTop < 200;
            if (scrollPlaceInBottom) {
                container.current.scroll({
                    behavior: 'smooth',
                    top     : container.current.scrollHeight,
                });
            }
        }
    }, [ dialogueId, messages ]);

    useEffect(() => {
        if (dialogueId && container.current) {
            container.current.scroll({ top: container.current.scrollHeight });
        }
    }, [ dialogueId ]);

    usePrivateDialogueMessagesLoaderTrigger(dialogueId, container);

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            ref={ container }
        >
            <div className={ css.content }>
                {
                    searchMessages[dialogueId]
                    ? searchMessages[dialogueId]
                        .searchMessages
                        .map((message) =>
                            <PrivateMessage
                                hash={ hash }
                                key={ message.id }
                                message={ message }
                                userId={ userData.id }
                            />,
                        )
                    : messages[dialogueId]
                        .messages
                        .map((message) =>
                            <PrivateMessage
                                hash={ hash }
                                key={ message.id }
                                message={ message }
                                userId={ userData.id }
                            />,
                        )
                }
            </div>
        </div>
    );
});