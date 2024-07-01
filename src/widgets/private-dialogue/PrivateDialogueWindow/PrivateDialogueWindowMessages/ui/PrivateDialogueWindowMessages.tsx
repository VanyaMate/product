import { ComponentPropsWithoutRef, FC, memo, useEffect, useRef } from 'react';
import classNames from 'classnames';
import css from './PrivateDialogueWindowMessages.module.scss';
import {
    PrivateMessage,
} from '@/entities/message/item/PrivateMessage/ui/PrivateMessage.tsx';
import { useLocation } from 'react-router-dom';
import {
    usePrivateDialogueMessagesLoaderTrigger,
} from '@/features/private-dialogue/hooks/usePrivateDialogueMessagesLoaderTrigger/usePrivateDialogueMessagesLoaderTrigger.ts';
import {
    NoMoreMessageDialogue,
} from '@/entities/dialogue/NoMoreMessageDialogue/ui/NoMoreMessageDialogue.tsx';
import {
    EmptyDialogue,
} from '@/entities/dialogue/EmptyDialogue/ui/EmptyDialogue.tsx';
import { useStore } from '@vanyamate/sec-react';
import {
    $privateMessagesHasMore,
    $privateMessages,
    $privateMessagesSearchMessages,
    $privateMessageScrollToId,
    $privateMessagesIsPending,
} from '@/app/model/private-messages/private-messages.model.ts';
import { $authUser } from '@/app/model/auth/auth.model.ts';


export type PrivateDialogueWindowMessagesProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateDialogueWindowMessages: FC<PrivateDialogueWindowMessagesProps> = memo(function PrivateDialogueWindowMessages (props) {
    const { className, dialogueId, ...other } = props;
    const messages                            = useStore($privateMessages);
    const searchMessages                      = useStore($privateMessagesSearchMessages);
    const hasMoreMessages                     = useStore($privateMessagesHasMore);
    const messageIdScroll                     = useStore($privateMessageScrollToId);
    const messageLoading                      = useStore($privateMessagesIsPending);
    const userData                            = useStore($authUser);
    const { hash }                            = useLocation();
    const container                           = useRef<HTMLDivElement>(null);
    const needScrollToBottom                  = useRef<boolean>(true);

    // Надо нафиг переделать о.О

    // Если меняется диалог -> нужно проскролить в самый низ
    useEffect(() => {
        needScrollToBottom.current = true;
    }, [ dialogueId ]);

    // Если есть диалог, если есть что скроллить, и если нужно проскролить
    // -> скролл в самый низ
    useEffect(() => {
        if (dialogueId && container.current && needScrollToBottom.current) {
            container.current.scrollTop = container.current.scrollHeight;
            console.log('Toggle need scroll to: false', container.current.scrollHeight > container.current.clientHeight);
            if (container.current.scrollHeight > container.current.clientHeight) {
                needScrollToBottom.current = false;
            }
        }
    }, [ dialogueId, messages ]);

    // Скролл до элемента из hash-а
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

    // Скролл до первого нового сообщения после загрузки
    useEffect(() => {
        if (container.current && dialogueId && !needScrollToBottom.current) {
            const { scrollTop }    = container.current;
            const scrollPlaceInTop = scrollTop <= 5;
            setTimeout(() => {
                if (!container.current) {
                    return null;
                }

                if (scrollPlaceInTop && messageIdScroll !== '') {
                    const firstMessage = container.current.querySelector(`#m_${ messageIdScroll }`);
                    firstMessage?.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [ dialogueId, messageIdScroll ]);

    useEffect(() => {
        if (dialogueId && messageLoading && container.current && !needScrollToBottom.current) {
            if (container.current.scrollTop === 0) {
                container.current.scrollTop = 1;
            }
        }
    }, [ dialogueId, messageLoading ]);

    usePrivateDialogueMessagesLoaderTrigger(dialogueId, container, !needScrollToBottom.current);

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            ref={ container }
        >
            <div className={ css.content }>
                {
                    !messages[dialogueId].length ?
                    <EmptyDialogue/> :
                    !hasMoreMessages[dialogueId] ?
                    <NoMoreMessageDialogue/> : null
                }
                {
                    searchMessages[dialogueId]
                    ? searchMessages[dialogueId]
                        .map((message) =>
                            <PrivateMessage
                                hash={ hash }
                                key={ message.id }
                                message={ message }
                                userId={ userData.id }
                            />,
                        )
                    : messages[dialogueId]
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