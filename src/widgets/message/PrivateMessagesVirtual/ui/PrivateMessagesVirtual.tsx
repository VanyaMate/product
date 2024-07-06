import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useCallback,
    useEffect, useState,
} from 'react';
import { useStore } from '@vanyamate/sec-react';
import {
    $privateMessages, $privateMessagesHasMore,
    $privateMessagesIsPending,
    getPrivateMessagesByCursorEffect,
} from '@/app/model/private-messages/private-messages.model.ts';
import { $authUser } from '@/app/model/auth/auth.model.ts';
import { useLocation } from 'react-router-dom';
import {
    PrivateMessage,
} from '@/entities/message/item/PrivateMessage/ui/PrivateMessage.tsx';
import classNames from 'classnames';
import css from './PrivateMessagesVirtual.module.scss';
import { BottomInfinityScroll } from '@vanyamate/react-infinity-virtual';


export type PrivateMessagesVirtualProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateMessagesVirtual: FC<PrivateMessagesVirtualProps> = memo(function PrivateMessagesVirtual (props) {
    const { className, dialogueId, ...other } = props;
    const { hash }                            = useLocation();
    const authData                            = useStore($authUser);
    const messages                            = useStore($privateMessages);
    const messagesIsLoading                   = useStore($privateMessagesIsPending);
    const messagesHasMore                     = useStore($privateMessagesHasMore);
    const [ virtualKey, setVirtualKey ]       = useState<string>(dialogueId);

    useEffect(() => {
        setVirtualKey(dialogueId);

        if (messages[dialogueId].length < 60 && messages[dialogueId]?.[0]?.id) {
            getPrivateMessagesByCursorEffect([ dialogueId, {
                cursor: messages[dialogueId][0].id,
                limit : 60,
                query : '',
            } ]);
        }
        // eslint-disable-next-line
    }, [ dialogueId ]);

    const OnShowIndexChange = useCallback((index: number) => {
        if (messages[dialogueId]?.[0]?.id) {
            if ((index < 60) && !messagesIsLoading[dialogueId] && messagesHasMore[dialogueId]) {
                getPrivateMessagesByCursorEffect([ dialogueId, {
                    cursor: messages[dialogueId][0].id,
                    limit : 60,
                    query : '',
                } ]);
            }
        }
        // eslint-disable-next-line
    }, [ dialogueId, messagesIsLoading, messagesHasMore ]);

    return (
        <div
            { ...other }
            className={ classNames(className, css.container) }
        >
            <BottomInfinityScroll
                className={ css.scrollBox }
                contentClassName={ css.content }
                distanceToNext={ 400 }
                key={ virtualKey }
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
        </div>
    );
});