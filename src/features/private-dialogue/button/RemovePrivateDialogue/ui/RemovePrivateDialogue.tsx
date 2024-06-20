import { FC, memo } from 'react';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoRemoveCircle } from 'react-icons/io5';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import { ButtonProps } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    removePrivateDialogue,
} from '@/app/redux/slices/private-dialogues/thunks/removePrivateDialogue/removePrivateDialogue.ts';


export type RemovePrivateDialogueProps =
    {
        dialogueId: string;
    }
    & ButtonProps;

export const RemovePrivateDialogue: FC<RemovePrivateDialogueProps> = memo(function RemovePrivateDialogue (props) {
    const { className, dialogueId, ...other } = props;
    const dispatch                            = useAppDispatch();

    return (
        <ButtonWithLoading
            { ...other }
            className={ className }
            onClick={ () => dispatch(removePrivateDialogue(dialogueId)) }
            quad
            styleType={ ButtonStyleType.DANGER }
        >
            <IoRemoveCircle/>
        </ButtonWithLoading>
    );
});