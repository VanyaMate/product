import { FC, memo } from 'react';
import {
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { IoPersonAdd } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import {
    createFriendRequestForUser,
} from '@/app/redux/slices/friends/thunks/createFriendRequestForUser/createFriendRequestForUser.ts';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';


export type AddToFriendButtonProps =
    {
        userId: string;
    }
    & ButtonProps;

export const AddToFriendButton: FC<AddToFriendButtonProps> = memo(function AddToFriendButton (props) {
    const { className, userId, ...other } = props;
    const dispatch                        = useAppDispatch();

    return (
        <ButtonWithLoading
            { ...other }
            className={ className }
            onClick={ () => dispatch(createFriendRequestForUser(userId)) }
            quad
            styleType={ ButtonStyleType.PRIMARY }
        >
            <IoPersonAdd/>
        </ButtonWithLoading>
    );
});