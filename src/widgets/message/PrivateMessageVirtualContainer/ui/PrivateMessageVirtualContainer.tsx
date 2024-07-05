import { ComponentPropsWithoutRef, FC, memo, useEffect, useRef } from 'react';
import classNames from 'classnames';
import css from './PrivateMessageVirtualContainer.module.scss';
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
    usePrivateDialogueMessagesLoaderTrigger,
} from '@/features/private-dialogue/hooks/usePrivateDialogueMessagesLoaderTrigger/usePrivateDialogueMessagesLoaderTrigger.ts';
import { useVirtualizer } from '@tanstack/react-virtual';


export type PrivateMessagesVirtualContainerProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateMessagesVirtualContainer: FC<PrivateMessagesVirtualContainerProps> = memo(function PrivateMessagesVirtualContainer (props) {
    const { className, dialogueId, ...other } = props;
    const containerRef                        = useRef<HTMLDivElement | null>(null);
    const scrollToLastMessage                 = useRef<boolean>(true);
    const scrollToFirstMessage                = useRef<boolean>(false);
    const scrollSmoothToLastMessage           = useRef<boolean>(false);

    const { hash }          = useLocation();
    const authData          = useStore($authUser);
    const messages          = useStore($privateMessages);
    const messagesIsLoading = useStore($privateMessagesIsPending);
    const scrollToMessageId = useStore($privateMessageScrollToId);
    // const searchMessages    = useStore($privateMessagesSearchMessages);

    const virtualized = useVirtualizer({
        count             : messages[dialogueId].length,
        getScrollElement  : () => containerRef.current,
        estimateSize      : () => 50,
        gap               : 10,
        scrollPaddingStart: 10,
        scrollPaddingEnd  : 10,
    });

    const items = virtualized.getVirtualItems();

    useEffect(() => {
        scrollToLastMessage.current       = true;
        scrollSmoothToLastMessage.current = false;
    }, [ dialogueId ]);

    useEffect(() => {
        if (containerRef.current) {
            const ref             = containerRef.current;
            const onScrollHandler = function () {
                const {
                          scrollTop,
                          scrollHeight,
                          offsetHeight,
                      }                           = ref;
                scrollSmoothToLastMessage.current = (scrollTop + offsetHeight + 250) >= scrollHeight;
            };
            ref.addEventListener('scroll', onScrollHandler);
            return () => ref.removeEventListener('scroll', onScrollHandler);
        }
    }, [ containerRef ]);

    useEffect(() => {
        setTimeout(() => {
            if (containerRef.current && scrollSmoothToLastMessage.current) {
                containerRef.current.scrollTo({
                    behavior: 'smooth',
                    top     : containerRef.current.scrollHeight + 50,
                });
            }
        });
    }, [ containerRef, messages ]);

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
                scrollToLastMessage.current = false;
                virtualized.scrollToIndex(messages[dialogueId].length - 1);
            }
        });
    }, [ containerRef, messages, dialogueId, virtualized ]);

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
            <div
                className={ css.content }
                style={ { height: virtualized.getTotalSize() } }
            >
                <div
                    style={ {
                        position     : 'absolute',
                        top          : 5,
                        left         : 5,
                        width        : 'calc(100% - 15px)',
                        transform    : `translateY(${ items[0]?.start ?? 0 }px)`,
                        display      : 'flex',
                        flexDirection: 'column',
                        gap          : 'var(--offset-medium)',
                        paddingBottom: 5,
                    } }
                >
                    {
                        items.map((virtualRow) => (
                            <div
                                className={
                                    virtualRow.index % 2 ? 'ListItemOdd'
                                                         : 'ListItemEven'
                                }
                                data-index={ virtualRow.index }
                                key={ virtualRow.key }
                                ref={ virtualized.measureElement }
                            >
                                <PrivateMessage
                                    hash={ hash }
                                    message={ messages[dialogueId][virtualRow.index] }
                                    userId={ authData.id }
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
});