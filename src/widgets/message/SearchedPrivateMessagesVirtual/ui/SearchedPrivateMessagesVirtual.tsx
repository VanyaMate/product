import {
    ComponentPropsWithoutRef,
    FC,
    memo,
} from 'react';
import { useStore } from '@vanyamate/sec-react';
import {
    $privateMessagesSearchMessages,
} from '@/app/model/private-messages/private-messages.model.ts';
import { $authUser } from '@/app/model/auth/auth.model.ts';
import { useLocation } from 'react-router-dom';
import {
    PrivateMessage,
} from '@/entities/message/item/PrivateMessage/ui/PrivateMessage.tsx';
import classNames from 'classnames';
import css from './SearchedPrivateMessagesVirtual.module.scss';
import { BottomInfinityScroll } from '@vanyamate/react-infinity-virtual';
import {
    MessagesNotFound,
} from '@/entities/message/MessagesNotFound/ui/MessagesNotFound.tsx';


export type PrivateMessagesVirtualProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const SearchedPrivateMessagesVirtual: FC<PrivateMessagesVirtualProps> = memo(function PrivateMessagesVirtual (props) {
    const { className, dialogueId, ...other } = props;
    const { hash }                            = useLocation();
    const authData                            = useStore($authUser);
    const messages                            = useStore($privateMessagesSearchMessages);

    if (messages[dialogueId].length === 0) {
        return (
            <MessagesNotFound
                { ...other }
                className={ classNames(className, css.container) }
            />
        );
    }

    return (
        <div
            { ...other }
            className={ classNames(className, css.container) }
        >
            <BottomInfinityScroll
                className={ css.scrollBox }
                contentClassName={ css.content }
                distanceToNext={ 200 }
                key={ dialogueId + 'search' }
                showAmount={ 40 }
            >
                {
                    messages[dialogueId].map((message) => (
                        <PrivateMessage
                            hash={ hash }
                            key={ message.id }
                            message={ message }
                            userId={ authData.id }
                        />
                    ))
                }
            </BottomInfinityScroll>
        </div>
    );
});