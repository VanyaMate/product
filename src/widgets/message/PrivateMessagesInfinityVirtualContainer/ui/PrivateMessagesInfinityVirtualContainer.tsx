import {
    ComponentPropsWithoutRef,
    FC,
    memo, useCallback,
    useLayoutEffect,
} from 'react';
import { useStore } from '@vanyamate/sec-react';
import {
    $privateMessages, getPrivateMessagesByCursorEffect,
} from '@/app/model/private-messages/private-messages.model.ts';
import { $authUser } from '@/app/model/auth/auth.model.ts';
import {
    PrivateMessage,
} from '@/entities/message/item/PrivateMessage/ui/PrivateMessage.tsx';
import { Virtual } from '@/shared/ui-tanstack/box/Virtual/ui/Virtual.tsx';
import { DomainMessage } from 'product-types/dist/message/DomainMessage';
import { Loader } from '@/shared/ui-kit/loaders/Loader/ui/Loader.tsx';


export type PrivateMessagesInfinityVirtualContainerProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateMessagesInfinityVirtualContainer: FC<PrivateMessagesInfinityVirtualContainerProps> = memo(function PrivateMessagesInfinityVirtualContainer (props) {
    const { dialogueId, ...other } = props;
    const messages                 = useStore($privateMessages);
    const user                     = useStore($authUser);

    useLayoutEffect(() => {
        if (messages[dialogueId].length === 1) {
            getPrivateMessagesByCursorEffect([ dialogueId, {
                cursor: messages[dialogueId][0].id,
                limit : 30,
                query : '',
            } ]);
        }
    }, [ dialogueId, messages ]);

    const render = useCallback((message: DomainMessage) => (
        <PrivateMessage message={ message } userId={ user.id }/>
    ), [ user.id ]);

    return (
        <Virtual
            { ...other }
            estimateSize={ 60 }
            gap={ 10 }
            hasPrev={ true }
            list={ messages[dialogueId] }
            loader={ <Loader/> }
            render={ render }
            side="BOTTOM"
            uploadPrev={ () => getPrivateMessagesByCursorEffect([ dialogueId, {
                cursor: messages[dialogueId][0].id,
                limit : 30,
                query : '',
            } ]) }
        />
    );
});