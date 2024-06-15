import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './PrivateDialogueWindow.module.scss';
import {
    PrivateDialogueWindowHeader,
} from '@/widgets/private-dialogue/PrivateDialogueWindow/PrivateDialogueWindowHeader/ui/PrivateDialogueWindowHeader.tsx';
import {
    PrivateDialogueWindowMessages,
} from '@/widgets/private-dialogue/PrivateDialogueWindow/PrivateDialogueWindowMessages/ui/PrivateDialogueWindowMessages.tsx';
import {
    PrivateDialogueWindowInput,
} from '@/widgets/private-dialogue/PrivateDialogueWindow/PrivateDialogueWindowInput/PrivateDialogueWindowInput.tsx';


export type PrivateDialogueWindowProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateDialogueWindow: FC<PrivateDialogueWindowProps> = memo(function PrivateDialogueWindow (props) {
    const { className, dialogueId, ...other } = props;

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <PrivateDialogueWindowHeader
                className={ css.header }
                dialogueId={ dialogueId }
            />
            <PrivateDialogueWindowMessages
                className={ css.messages }
                dialogueId={ dialogueId }
            />
            <PrivateDialogueWindowInput
                className={ css.input }
                dialogueId={ dialogueId }
            />
        </div>
    );
});