import { FC, memo } from 'react';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoRemoveCircle } from 'react-icons/io5';
import { ButtonProps } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    removePrivateDialogueEffect,
} from '@/app/model/private-dialogues/private-dialogues.model.ts';


export type RemovePrivateDialogueProps =
    {
        dialogueId: string;
    }
    & ButtonProps;

export const RemovePrivateDialogue: FC<RemovePrivateDialogueProps> = memo(function RemovePrivateDialogue (props) {
    const { className, dialogueId, ...other } = props;

    return (
        <ButtonWithLoading
            { ...other }
            className={ className }
            onClick={ () => removePrivateDialogueEffect(dialogueId) }
            quad
            styleType={ ButtonStyleType.DANGER }
        >
            <IoRemoveCircle/>
        </ButtonWithLoading>
    );
});