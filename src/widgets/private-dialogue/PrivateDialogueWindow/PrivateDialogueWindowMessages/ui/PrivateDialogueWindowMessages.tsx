import { ComponentPropsWithoutRef, FC, memo, useEffect, useRef } from 'react';
import classNames from 'classnames';
import css from './PrivateDialogueWindowMessages.module.scss';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import { Message } from '@/entities/message/item/Message/ui/Message.tsx';
import {
    getAuthUser,
} from '@/app/redux/slices/auth/selectors/getAuthUser/getAuthUser.ts';


export type PrivateDialogueWindowMessagesProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateDialogueWindowMessages: FC<PrivateDialogueWindowMessagesProps> = memo(function PrivateDialogueWindowMessages (props) {
    const { className, dialogueId, ...other } = props;
    const dialogues                           = useAppSelector((state) => state.dialogues);
    const userData                            = useAppSelector(getAuthUser);
    const container                           = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (dialogueId && container.current) {
            container.current.scroll({
                behavior: 'smooth',
                top     : container.current.scrollHeight,
            });
        }
    }, [ dialogueId, dialogues ]);

    if (!dialogueId) {
        return 'No selected dialogue';
    }

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            ref={ container }
        >
            <div className={ css.content }>
                {
                    dialogues
                        .dialogues
                        .find((dialogue) => dialogue.id === dialogueId)
                        .messages
                        .map((message) =>
                            <Message
                                key={ message.id }
                                message={ message }
                                userId={ userData.id }
                            />,
                        )
                }
            </div>
        </div>
    );
});