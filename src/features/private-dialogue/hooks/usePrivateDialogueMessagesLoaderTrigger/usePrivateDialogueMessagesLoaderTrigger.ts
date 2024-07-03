import { MutableRefObject, useEffect } from 'react';
import { useThrottle } from '@/shared/hooks/useThrottle/useThrottle.ts';
import { useStore } from '@vanyamate/sec-react';
import {
    getPrivateMessagesByCursorEffect,
    $privateMessagesHasMore,
    $privateMessagesIsPending,
    $privateMessages,
} from '@/app/model/private-messages/private-messages.model.ts';


export const usePrivateDialogueMessagesLoaderTrigger = function (dialogueId: string, ref: MutableRefObject<HTMLDivElement>, enable: boolean): void {
    const throttle          = useThrottle(200);
    const messages          = useStore($privateMessages);
    const messagesIsPending = useStore($privateMessagesIsPending);
    const messagesHasMore   = useStore($privateMessagesHasMore);

    // TODO: Переделать этот ужас

    useEffect(() => {
        const container = ref.current;
        if (container && dialogueId && enable) {
            const loadMessageHandler = () => {
                const dialogueMessages = messages[dialogueId];
                if (dialogueMessages) {
                    if (dialogueMessages.length && !messagesIsPending[dialogueId] && messagesHasMore[dialogueId]) {
                        getPrivateMessagesByCursorEffect([ dialogueId, {
                            cursor: dialogueMessages[0].id,
                            limit : 20,
                            query : '',
                        } ]);
                    }
                }
            };
            const onScroll           = () => throttle(() => {
                if (ref.current.scrollTop < 1000) {
                    loadMessageHandler();
                }
            });

            if (ref.current.offsetHeight === ref.current.scrollHeight) {
                loadMessageHandler();
            }

            container.addEventListener('scroll', onScroll);

            return () => {
                container?.removeEventListener('scroll', onScroll);
            };
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ dialogueId, messages, messagesHasMore[dialogueId], messagesIsPending[dialogueId], ref, throttle ]);
};