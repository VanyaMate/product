import {
    ComponentPropsWithoutRef,
    FC,
    memo,
} from 'react';
import { useStore } from '@vanyamate/sec-react';
import {
    $privateMessagesSearchMessages,
} from '@/app/model/private-messages/private-messages.model.ts';
import {
    SearchedPrivateMessagesVirtual,
} from '@/widgets/message/SearchedPrivateMessagesVirtual/ui/SearchedPrivateMessagesVirtual.tsx';
import {
    PrivateMessagesVirtual,
} from '@/widgets/message/PrivateMessagesVirtual/ui/PrivateMessagesVirtual.tsx';


export type PrivateMessagesVirtualContainerProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateMessagesVirtualContainer: FC<PrivateMessagesVirtualContainerProps> = memo(function PrivateMessagesVirtualContainer (props) {
    const { dialogueId, ...other } = props;
    const messages                 = useStore($privateMessagesSearchMessages);

    if (messages[dialogueId]) {
        return (
            <SearchedPrivateMessagesVirtual
                { ...other }
                dialogueId={ dialogueId }
            />
        );
    } else {
        return (
            <PrivateMessagesVirtual
                { ...other }
                dialogueId={ dialogueId }
            />
        );
    }
});