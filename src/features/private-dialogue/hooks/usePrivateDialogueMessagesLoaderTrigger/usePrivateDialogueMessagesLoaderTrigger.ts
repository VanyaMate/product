import { MutableRefObject, useEffect } from 'react';
import { useThrottle } from '@/shared/hooks/useThrottle/useThrottle.ts';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import {
    getMessagesByCursor,
} from '@/app/redux/slices/private-messages/thunks/getMessagesByCursor.ts';


export const usePrivateDialogueMessagesLoaderTrigger = function (dialogueId: string, ref: MutableRefObject<HTMLDivElement>): void {
    const throttle = useThrottle(250);
    const messages = useAppSelector((state) => state.privateMessages);
    const dispatch = useAppDispatch();

    // TODO: Переделать этот ужас

    useEffect(() => {
        const container = ref.current;
        if (container && dialogueId) {
            const onScroll = () => throttle(() => {
                if (ref.current.scrollTop < 1000) {
                    const dialogueMessages = messages[dialogueId];
                    if (dialogueMessages) {
                        if (dialogueMessages.messages.length && !dialogueMessages.isPending && dialogueMessages.hasMoreMessage) {
                            dispatch(getMessagesByCursor([ dialogueId, {
                                cursor: dialogueMessages.messages[0].id,
                                limit : 20,
                                query : '',
                            } ]));
                        }
                    }
                }
            });

            container.addEventListener('scroll', onScroll);

            return () => {
                container?.removeEventListener('scroll', onScroll);
            };
        }
    }, [ dialogueId, dispatch, messages, ref, throttle ]);
};