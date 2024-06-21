import { FC, memo } from 'react';
import { ButtonProps } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoReader } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import {
    readAllPrivateMessage,
} from '@/app/redux/slices/private-messages/thunks/readAllPrivateMessage.ts';


export type ReadAllMessagesPrivateDialogueProps =
    {
        dialogueId: string;
    }
    & ButtonProps;

export const ReadAllMessagesPrivateDialogue: FC<ReadAllMessagesPrivateDialogueProps> = memo(function ReadAllMessagesPrivateDialogue (props) {
    const { dialogueId, ...other } = props;
    const dispatch                 = useAppDispatch();

    return (
        <ButtonWithLoading
            { ...other }
            onClick={ () => dispatch(readAllPrivateMessage(dialogueId)) }
            quad
            styleType={ ButtonStyleType.PRIMARY }
        >
            <IoReader/>
        </ButtonWithLoading>
    );
});