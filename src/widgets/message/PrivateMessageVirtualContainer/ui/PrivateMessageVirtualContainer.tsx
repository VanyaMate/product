import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useCallback,
    useEffect,
} from 'react';
import { useStore } from '@vanyamate/sec-react';
import {
    $privateMessages,
    $privateMessagesIsPending,
    getPrivateMessagesByCursorEffect,
} from '@/app/model/private-messages/private-messages.model.ts';
import { $authUser } from '@/app/model/auth/auth.model.ts';
import { useLocation } from 'react-router-dom';
import {
    PrivateMessage,
} from '@/entities/message/item/PrivateMessage/ui/PrivateMessage.tsx';
import classNames from 'classnames';
import css from './PrivateMessageVirtualContainer.module.scss';
import { BottomInfinityScroll } from '@vanyamate/react-infinity-virtual';


export type PrivateMessagesVirtualContainerProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateMessagesVirtualContainer: FC<PrivateMessagesVirtualContainerProps> = memo(function PrivateMessagesVirtualContainer (props) {
    const { className, dialogueId, ...other } = props;
    const { hash }                            = useLocation();
    const authData                            = useStore($authUser);
    const messages                            = useStore($privateMessages);
    const messagesIsLoading                   = useStore($privateMessagesIsPending);

    useEffect(() => {
        if (messages[dialogueId].length < 60) {
            getPrivateMessagesByCursorEffect([ dialogueId, {
                cursor: messages[dialogueId][0].id,
                limit : 60,
                query : '',
            } ]);
        }
        // eslint-disable-next-line
    }, [ dialogueId ]);

    const OnShowIndexChange = useCallback((index: number) => {
        if ((index < 60) && !messagesIsLoading[dialogueId]) {
            getPrivateMessagesByCursorEffect([ dialogueId, {
                cursor: messages[dialogueId][0].id,
                limit : 60,
                query : '',
            } ]);
        }
    }, [ dialogueId, messages, messagesIsLoading ]);

    return (
        <BottomInfinityScroll
            { ...other }
            className={ classNames(className, css.container) }
            contentClassName={ css.content }
            distanceToNext={ 400 }
            key={ dialogueId }
            onShowIndexChange={ OnShowIndexChange }
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
    );
});