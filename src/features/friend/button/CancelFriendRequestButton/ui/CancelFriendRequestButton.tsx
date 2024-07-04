import { FC, memo } from 'react';
import {
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { IoPersonRemove } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import {
    cancelFriendRequestEffect,
} from '@/app/model/friends/friends.model.ts';


export type CancelFriendRequestButtonProps =
    {
        requestId: string;
    }
    & ButtonProps;

export const CancelFriendRequestButton: FC<CancelFriendRequestButtonProps> = memo(function CancelFriendRequestButton (props) {
    const { className, requestId, ...other } = props;

    return (
        <ButtonWithLoading
            { ...other }
            className={ className }
            onClick={ () => cancelFriendRequestEffect(requestId) }
            quad
            styleType={ ButtonStyleType.DANGER }
        >
            <IoPersonRemove/>
        </ButtonWithLoading>
    );
});