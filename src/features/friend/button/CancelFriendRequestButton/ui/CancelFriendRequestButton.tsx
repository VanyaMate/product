import { FC, memo } from 'react';
import {
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { IoPersonRemove } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import {
    cancelFriendRequest,
} from '@/app/redux/slices/friends/thunks/cancelFriendRequest/cancelFriendRequest.ts';
import {
    ButtonWithLoading
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';


export type CancelFriendRequestButtonProps =
    {
        requestId: string;
    }
    & ButtonProps;

export const CancelFriendRequestButton: FC<CancelFriendRequestButtonProps> = memo(function CancelFriendRequestButton (props) {
    const { className, requestId, ...other } = props;
    const dispatch                           = useAppDispatch();

    return (
        <ButtonWithLoading
            { ...other }
            className={ className }
            onClick={ () => dispatch(cancelFriendRequest(requestId)) }
            quad
            styleType={ ButtonStyleType.DANGER }
        >
            <IoPersonRemove/>
        </ButtonWithLoading>
    );
});