import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useCallback,
    useLayoutEffect, useMemo,
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
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { IoArrowDown } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    $privateDialogues,
} from '@/app/model/private-dialogues/private-dialogues.model.ts';


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
    const dialogues                           = useStore($privateDialogues);
    const user                                = useStore($authUser);
    const dialogue                            = useMemo(() => dialogues.find((dialogue) => dialogue.id === dialogueId), [ dialogueId, dialogues ]);

    const loadPreviousMessages = useCallback(async () => {
        const messageId = messages[dialogueId]?.[0]?.id;
        if (messageId) {
            return getPrivateMessagesByCursorEffect([ dialogueId, {
                cursor: messageId,
                limit : 40,
                query : '',
            } ]);
        }
    }, [ dialogueId, messages ]);

    useLayoutEffect(() => {
        const messagesLength = messages[dialogueId]?.length;
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

    if (!messages[dialogueId]?.length) {
        return <EmptyDialogue { ...other } className={ className }/>;
    }

    return (
        <Virtual
            { ...other }
            animationMs={ 100 }
            autoscrollNext
            className={ classNames(css.container, {}, [ className ]) }
            contentClassName={ css.content }
            distanceToTrigger={ 200 }
            hasMoreNext={ false }
            hasMorePrevious={ hasMoreMessages[dialogueId] ?? false }
            key={ dialogueId }
            list={ messages[dialogueId] ?? [] }
            loaderNextElement={ <Loader/> }
            loaderPreviousElement={ <Loader/> }
            loadingNext={ false }
            loadingPrevious={ messagesPending[dialogueId] ?? false }
            noMorePreviousElement={ <NoMoreMessageDialogue/> }
            permanentNextElement={ ({ toFirstItem }) => (
                <Row className={ css.panel }
                     fullWidth
                     spaceBetween>
                    <Row
                        className={ classNames(css.info, { [css.online]: dialogue.user.online }) }>
                        <span
                            className={ css.status }
                            key="status"
                        />
                        <span
                            className={ css.title }
                            key="title">{ dialogue.title || dialogue.user.login }</span>
                        <span/>
                        {/*                        <span className={ css.action } key="action">
                         { dialogue.user.online ? 'набирает сообщение...'
                         : `был в сети 35 минут назад` + '' }
                         </span>*/ }
                    </Row>
                    <Button onClick={ toFirstItem }
                            styleType={ ButtonStyleType.GHOST }>
                        <IoArrowDown/>
                    </Button>
                </Row>
            ) }
            render={ render }
            scrollDistance={ 150 }
            showAmount={ 40 }
            smoothAutoscroll={ true }
            type={ VirtualType.BOTTOM }
            uploadPrevious={ loadPreviousMessages }
        />
    );
});