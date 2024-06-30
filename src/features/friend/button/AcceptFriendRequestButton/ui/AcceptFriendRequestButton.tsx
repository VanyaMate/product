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
    acceptFriendRequestEffect,
} from '@/app/model/friends/friends.model.ts';


export type AcceptFriendRequestButtonProps =
    {
        requestId: string;
    }
    & ButtonProps;

export const AcceptFriendRequestButton: FC<AcceptFriendRequestButtonProps> = memo(function AcceptFriendRequestButton (props) {
    const { className, requestId, ...other } = props;

    return (
        <ButtonWithLoading
            { ...other }
            className={ className }
            onClick={ () => acceptFriendRequestEffect(requestId) }
            quad
            styleType={ ButtonStyleType.SECOND }
        >
            <IoPersonAdd/>
        </ButtonWithLoading>
    );
});