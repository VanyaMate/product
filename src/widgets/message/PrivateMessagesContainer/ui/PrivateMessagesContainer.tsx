import { ComponentPropsWithoutRef, FC, memo, useEffect, useRef } from 'react';
import classNames from 'classnames';
import css from './PrivateMessagesContainer.module.scss';
import { useStore } from '@vanyamate/sec-react';
import {
    $privateMessages, $privateMessageScrollToId,
    $privateMessagesIsPending,
} from '@/app/model/private-messages/private-messages.model.ts';
import {
    PrivateMessage,
} from '@/entities/message/item/PrivateMessage/ui/PrivateMessage.tsx';
import { $authUser } from '@/app/model/auth/auth.model.ts';
import { useLocation } from 'react-router-dom';
import {
    EmptyDialogue,
} from '@/entities/dialogue/EmptyDialogue/ui/EmptyDialogue.tsx';
import {
    usePrivateDialogueMessagesLoaderTrigger,
} from '@/features/private-dialogue/hooks/usePrivateDialogueMessagesLoaderTrigger/usePrivateDialogueMessagesLoaderTrigger.ts';


export type PrivateMessagesContainerProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateMessagesContainer: FC<PrivateMessagesContainerProps> = memo(function PrivateMessagesContainer (props) {
    const { className, dialogueId, ...other } = props;
    const containerRef                        = useRef<HTMLDivElement | null>(null);
    const scrollToLastMessage                 = useRef<boolean>(true);
    const scrollToFirstMessage                = useRef<boolean>(false);

    const { hash }          = useLocation();
    const authData          = useStore($authUser);
    const messages          = useStore($privateMessages);
    const messagesIsLoading = useStore($privateMessagesIsPending);
    const scrollToMessageId = useStore($privateMessageScrollToId);

    useEffect(() => {
        scrollToLastMessage.current = true;
    }, [ dialogueId ]);

    useEffect(() => {
        setTimeout(() => {
            if (containerRef.current && messagesIsLoading[dialogueId] && !scrollToLastMessage.current) {
                const { scrollTop } = containerRef.current;
                if (scrollTop === 0) {
                    scrollToFirstMessage.current   = true;
                    containerRef.current.scrollTop = 1;
                }
            }
        });
    }, [ dialogueId, messagesIsLoading, containerRef ]);

    useEffect(() => {
        setTimeout(() => {
            if (containerRef.current && scrollToLastMessage.current) {
                const { offsetHeight, scrollHeight } = containerRef.current;
                if (scrollHeight > offsetHeight) {
                    containerRef.current.scrollTop = scrollHeight;
                    scrollToLastMessage.current    = false;
                }
            }
        });
    }, [ containerRef, messages, dialogueId ]);

    useEffect(() => {
        setTimeout(() => {
            if (containerRef.current && scrollToMessageId && scrollToFirstMessage.current) {
                const messageElement = containerRef.current.querySelector(`#m_${ scrollToMessageId }`);
                if (messageElement) {
                    containerRef.current.scrollTo({
                        behavior: 'smooth',
                        top     : containerRef.current.scrollTop - messageElement.scrollHeight - 10,
                    });
                }
            }
        });
    }, [ containerRef, scrollToMessageId ]);

    usePrivateDialogueMessagesLoaderTrigger(dialogueId, containerRef, !messagesIsLoading[dialogueId]);

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            ref={ containerRef }
        >
            <div className={ css.content }>
                {
                    messages[dialogueId]
                    ? messages[dialogueId].map((message) => (
                        <PrivateMessage
                            hash={ hash }
                            key={ message.id }
                            message={ message }
                            userId={ authData.id }
                        />
                    ))
                    : <EmptyDialogue/>
                }
            </div>
        </div>
    );
});