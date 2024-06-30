import { FC, memo } from 'react';
import {
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { IoPersonAdd } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import {
    createFriendRequestEffect,
} from '@/app/model/friends/friends.model.ts';


export type AddToFriendButtonProps =
    {
        userId: string;
    }
    & ButtonProps;

export const AddToFriendButton: FC<AddToFriendButtonProps> = memo(function AddToFriendButton (props) {
    const { className, userId, ...other } = props;

    return (
        <ButtonWithLoading
            { ...other }
            className={ className }
            onClick={ () => createFriendRequestEffect(userId) }
            quad
            styleType={ ButtonStyleType.PRIMARY }
        >
            <IoPersonAdd/>
        </ButtonWithLoading>
    );
});