import { FC, memo } from 'react';
import {
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { IoPersonRemove } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { removeFriendEffect } from '@/app/model/friends/friends.model.ts';


export type RemoveFriendButtonProps =
    {
        userId: string;
    }
    & ButtonProps;

export const RemoveFriendButton: FC<RemoveFriendButtonProps> = memo(function RemoveFriendButton (props) {
    const { className, userId, ...other } = props;

    return (
        <ButtonWithLoading
            { ...other }
            className={ className }
            onClick={ () => removeFriendEffect(userId) }
            quad
            styleType={ ButtonStyleType.DANGER }
        >
            <IoPersonRemove/>
        </ButtonWithLoading>
    );
});