import { MutableRefObject, useEffect } from 'react';
import { useThrottle } from '@/shared/hooks/useThrottle/useThrottle.ts';
import { useStore } from '@vanyamate/sec-react';
import {
    getPrivateMessagesByCursorEffect,
    privateMessagesHasMore,
    privateMessagesIsPending,
    privateMessagesList,
} from '@/app/model/private-messages/private-messages.model.ts';


export const usePrivateDialogueMessagesLoaderTrigger = function (dialogueId: string, ref: MutableRefObject<HTMLDivElement>): void {
    const throttle          = useThrottle(250);
    const messages          = useStore(privateMessagesList);
    const messagesIsPending = useStore(privateMessagesIsPending);
    const messagesHasMore   = useStore(privateMessagesHasMore);

    // TODO: Переделать этот ужас

    useEffect(() => {
        const container = ref.current;
        if (container && dialogueId) {
            const onScroll = () => throttle(() => {
                if (ref.current.scrollTop < 1000) {
                    const dialogueMessages = messages[dialogueId];
                    if (dialogueMessages) {
                        if (dialogueMessages.messages.length && !messagesIsPending[dialogueId] && messagesHasMore[dialogueId]) {
                            getPrivateMessagesByCursorEffect([ dialogueId, {
                                cursor: dialogueMessages.messages[0].id,
                                limit : 20,
                                query : '',
                            } ]);
                        }
                    }
                }
            });

            container.addEventListener('scroll', onScroll);

            return () => {
                container?.removeEventListener('scroll', onScroll);
            };
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ dialogueId, messages, messagesHasMore[dialogueId], messagesIsPending[dialogueId], ref, throttle ]);
};