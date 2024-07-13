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
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import { useTranslation } from 'react-i18next';


export type RemovePrivateDialogueProps =
    {
        dialogueId: string;
    }
    & ButtonProps;

export const RemovePrivateDialogue: FC<RemovePrivateDialogueProps> = memo(function RemovePrivateDialogue (props) {
    const { className, dialogueId, ...other } = props;
    const { t }                               = useTranslation([ 'dialogue' ]);

    return (
        <PopOver popover={ t('remove_dialogue') }>
            <ButtonWithLoading
                { ...other }
                aria-label={ t('remove_dialogue') }
                className={ className }
                onClick={ () => removePrivateDialogueEffect(dialogueId) }
                quad
                styleType={ ButtonStyleType.DANGER }
            >
                <IoRemoveCircle/>
            </ButtonWithLoading>
        </PopOver>
    );
});