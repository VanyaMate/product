import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useCallback,
} from 'react';
import {
    InfinityVirtual,
} from '@/shared/ui-kit/box/InfinityVirtual/ui/InfinityVirtual.tsx';
import { useStore } from '@vanyamate/sec-react';
import {
    $privateMessages,
    $privateMessagesHasMore,
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


export type PrivateMessagesInfinityVirtualContainerProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateMessagesInfinityVirtualContainer: FC<PrivateMessagesInfinityVirtualContainerProps> = memo(function PrivateMessagesInfinityVirtualContainer (props) {
    const { dialogueId, className, ...other } = props;
    const messages                            = useStore($privateMessages);
    const hasMoreMessages                     = useStore($privateMessagesHasMore);
    const user                                = useStore($authUser);

    const loadPreviousMessages = useCallback(async () => {
        const messageId = messages[dialogueId][0]?.id;
        if (messageId) {
            return getPrivateMessagesByCursorEffect([ dialogueId, {
                cursor: messageId,
                limit : 20,
                query : '',
            } ]);
        }
    }, [ dialogueId, messages ]);

    const render = useCallback((message: DomainMessage) => (
        <PrivateMessage
            key={ message.id }
            message={ message }
            onShowMessage={ readPrivateMessageEffect }
            userId={ user.id }
        />
    ), [ user.id ]);

    return (
        <InfinityVirtual
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            contentClassName={ css.content }
            getTopItems={ loadPreviousMessages }
            hasMoreTop={ hasMoreMessages[dialogueId] }
            items={ messages[dialogueId] }
            key={ dialogueId }
            render={ render }
            showAmount={ 40 }
            side="bottom"
            smoothScroll
        />
    );
});