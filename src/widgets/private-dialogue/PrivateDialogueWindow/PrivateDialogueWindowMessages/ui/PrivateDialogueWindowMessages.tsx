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
    privateMessagesHasMore,
    privateMessagesList, privateMessagesSearchMessages,
} from '@/app/model/private-messages/private-messages.model.ts';
import { authUser } from '@/app/model/auth/auth.model.ts';


export type PrivateDialogueWindowMessagesProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateDialogueWindowMessages: FC<PrivateDialogueWindowMessagesProps> = memo(function PrivateDialogueWindowMessages (props) {
    const { className, dialogueId, ...other } = props;
    const messages                            = useStore(privateMessagesList);
    const searchMessages                      = useStore(privateMessagesSearchMessages);
    const hasMoreMessages                     = useStore(privateMessagesHasMore);
    const userData                            = useStore(authUser);
    const { hash }                            = useLocation();
    const container                           = useRef<HTMLDivElement>(null);
    const needScrollToBottom                  = useRef<boolean>(true);

    console.log('Messages', messages);

    // TODO: Переделать этот ужас со скроллами

    useEffect(() => {
        needScrollToBottom.current = true;
    }, [ dialogueId ]);

    useEffect(() => {
        if (dialogueId && container.current) {
            if (needScrollToBottom.current) {
                container.current.scroll({
                    top     : container.current.scrollHeight,
                    behavior: 'instant',
                });

                needScrollToBottom.current = container.current.scrollHeight === container.current.clientHeight;
            }
        }
    }, [ dialogueId, messages ]);

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
            setTimeout(() => {
                if (!container.current) {
                    return null;
                }
                const {
                          clientHeight,
                          scrollHeight,
                          scrollTop,
                      }                   = container.current;
                const scrollPlaceInBottom = scrollHeight - clientHeight - scrollTop < 200;
                const scrollPlaceInTop    = scrollTop === 0;

                if (scrollPlaceInBottom && messages[dialogueId].lastId) {
                    const lastMessage = container.current.querySelector(`#m_${ messages[dialogueId].lastId }`);
                    lastMessage?.scrollIntoView({ behavior: 'smooth' });
                } else if (scrollPlaceInTop && messages[dialogueId].firstId) {
                    const firstMessage = container.current.querySelector(`#m_${ messages[dialogueId].firstId }`);
                    firstMessage?.scrollIntoView({ behavior: 'instant' });
                }
            }, 100);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ dialogueId, messages[dialogueId]?.firstId, messages[dialogueId]?.lastId ]);

    usePrivateDialogueMessagesLoaderTrigger(dialogueId, container);

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            ref={ container }
        >
            <div className={ css.content }>
                {
                    !messages[dialogueId].messages.length ?
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