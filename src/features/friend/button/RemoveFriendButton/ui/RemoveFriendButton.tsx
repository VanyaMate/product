import { FC, memo } from 'react';
import {
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { IoPersonRemove } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import {
    removeFriend,
} from '@/app/redux/slices/friends/thunks/removeFriend/removeFriend.ts';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';


export type RemoveFriendButtonProps =
    {
        userId: string;
    }
    & ButtonProps;

export const RemoveFriendButton: FC<RemoveFriendButtonProps> = memo(function RemoveFriendButton (props) {
    const { className, userId, ...other } = props;
    const dispatch                        = useAppDispatch();

    return (
        <ButtonWithLoading
            { ...other }
            className={ className }
            onClick={ () => dispatch(removeFriend(userId)) }
            quad
            styleType={ ButtonStyleType.DANGER }
        >
            <IoPersonRemove/>
        </ButtonWithLoading>
    );
});