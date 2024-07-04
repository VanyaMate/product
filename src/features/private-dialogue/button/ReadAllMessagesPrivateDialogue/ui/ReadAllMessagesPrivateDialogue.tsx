import { FC, memo } from 'react';
import { ButtonProps } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoReader } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    readAllPrivateMessagesEffect,
} from '@/app/model/private-messages/private-messages.model.ts';


export type ReadAllMessagesPrivateDialogueProps =
    {
        dialogueId: string;
    }
    & ButtonProps;

export const ReadAllMessagesPrivateDialogue: FC<ReadAllMessagesPrivateDialogueProps> = memo(function ReadAllMessagesPrivateDialogue (props) {
    const { dialogueId, ...other } = props;

    return (
        <ButtonWithLoading
            { ...other }
            onClick={ () => readAllPrivateMessagesEffect(dialogueId) }
            quad
            styleType={ ButtonStyleType.PRIMARY }
        >
            <IoReader/>
        </ButtonWithLoading>
    );
});