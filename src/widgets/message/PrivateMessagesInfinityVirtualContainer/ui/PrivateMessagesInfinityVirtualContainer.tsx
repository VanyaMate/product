import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useCallback,
    useLayoutEffect,
} from 'react';
import { useStore } from '@vanyamate/sec-react';
import {
    $privateMessages,
    $privateMessagesHasMore,
    $privateMessagesIsPending,
    getPrivateMessagesByCursorEffect,
    readPrivateMessageEffect,
} from '@/app/model/private-messages/private-messages.model.ts';
import { DomainMessage } from 'product-types/dist/message/DomainMessage';
import {
    PrivateMessage,
} from '@/entities/message/item/PrivateMessage/ui/PrivateMessage.tsx';
import { $authUser } from '@/app/model/auth/auth.model.ts';
import css from './PrivateMessagesInfinityVirtualContainer.module.scss';
import classNames from 'classnames';
import {
    EmptyDialogue,
} from '@/entities/dialogue/EmptyDialogue/ui/EmptyDialogue.tsx';
import {
    VirtualRenderMethod,
    VirtualType,
} from '@/shared/ui-kit/box/Virtual/types/types.ts';
import { Virtual } from '@/shared/ui-kit/box/Virtual/ui/Virtual.tsx';
import { Loader } from '@/shared/ui-kit/loaders/Loader/ui/Loader.tsx';
import {
    NoMoreMessageDialogue,
} from '@/entities/dialogue/NoMoreMessageDialogue/ui/NoMoreMessageDialogue.tsx';


export type PrivateMessagesInfinityVirtualContainerProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateMessagesInfinityVirtualContainer: FC<PrivateMessagesInfinityVirtualContainerProps> = memo(function PrivateMessagesInfinityVirtualContainer (props) {
    const { dialogueId, className, ...other } = props;
    const messages                            = useStore($privateMessages);
    const hasMoreMessages                     = useStore($privateMessagesHasMore);
    const messagesPending                     = useStore($privateMessagesIsPending);
    const user                                = useStore($authUser);

    const loadPreviousMessages = useCallback(async () => {
        const messageId = messages[dialogueId][0]?.id;
        if (messageId) {
            return getPrivateMessagesByCursorEffect([ dialogueId, {
                cursor: messageId,
                limit : 40,
                query : '',
            } ]);
        }
    }, [ dialogueId, messages ]);

    useLayoutEffect(() => {
        const messagesLength = messages[dialogueId].length;
        if (messagesLength < 20 && hasMoreMessages[dialogueId]) {
            loadPreviousMessages();
        }
    }, [ dialogueId, hasMoreMessages, loadPreviousMessages, messages ]);

    const render = useCallback<VirtualRenderMethod>((message: DomainMessage) => (
        <PrivateMessage
            key={ message.id }
            message={ message }
            onShowMessage={ readPrivateMessageEffect }
            userId={ user.id }
        />
    ), [ user.id ]);

    if (!messages[dialogueId].length) {
        return <EmptyDialogue { ...other } className={ className }/>;
    }

    return (
        <Virtual
            { ...other }
            autoscrollNext
            className={ classNames(css.container, {}, [ className ]) }
            contentClassName={ css.content }
            distanceToTrigger={ 200 }
            hasMoreNext={ false }
            hasMorePrevious={ hasMoreMessages[dialogueId] }
            key={ dialogueId }
            list={ [ ...messages[dialogueId] ] }
            loaderNextElement={ <Loader/> }
            loaderPreviousElement={ <Loader/> }
            loadingNext={ false }
            loadingPrevious={ messagesPending[dialogueId] }
            noMoreNextElement="..."
            noMorePreviousElement={ <NoMoreMessageDialogue/> }
            render={ render }
            showAmount={ 40 }
            smoothAutoscroll={ true }
            type={ VirtualType.BOTTOM }
            uploadPrevious={ loadPreviousMessages }
        />
    );
});