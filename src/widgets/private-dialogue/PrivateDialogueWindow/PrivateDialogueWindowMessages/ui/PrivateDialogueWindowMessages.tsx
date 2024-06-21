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
import {
    NoMoreMessageDialogue,
} from '@/entities/dialogue/NoMoreMessageDialogue/ui/NoMoreMessageDialogue.tsx';
import {
    EmptyDialogue,
} from '@/entities/dialogue/EmptyDialogue/ui/EmptyDialogue.tsx';


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
    const needScrollToBottom                  = useRef<boolean>(true);

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
                const {
                          clientHeight,
                          scrollHeight,
                          scrollTop,
                      }                   = container.current;
                const scrollPlaceInBottom = scrollHeight - clientHeight - scrollTop < 200;
                const scrollPlaceInTop    = scrollTop === 0;

                if (scrollPlaceInBottom && messages[dialogueId].lastMessageId) {
                    const lastMessage = container.current.querySelector(`#m_${ messages[dialogueId].lastMessageId }`);
                    console.log('lastMessageId message id is', messages[dialogueId].lastMessageId);
                    lastMessage?.scrollIntoView({ behavior: 'smooth' });
                } else if (scrollPlaceInTop && messages[dialogueId].firstMessageId) {
                    const firstMessage = container.current.querySelector(`#m_${ messages[dialogueId].firstMessageId }`);
                    console.log('firstMessage message id is', messages[dialogueId].lastMessageId);
                    firstMessage?.scrollIntoView({ behavior: 'instant' });
                }
            }, 100);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ dialogueId, messages[dialogueId]?.firstMessageId, messages[dialogueId]?.lastMessageId ]);

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
                    !messages[dialogueId].hasMoreMessage ?
                    <NoMoreMessageDialogue/> : null
                }
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