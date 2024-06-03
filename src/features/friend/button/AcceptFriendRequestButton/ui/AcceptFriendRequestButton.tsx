import { FC, memo } from 'react';
import {
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { IoPersonAdd } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import {
    acceptFriendRequest,
} from '@/app/redux/slices/friends/thunks/acceptFriendRequest/acceptFriendRequest.ts';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';


export type AcceptFriendRequestButtonProps =
    {
        requestId: string;
    }
    & ButtonProps;

export const AcceptFriendRequestButton: FC<AcceptFriendRequestButtonProps> = memo(function AcceptFriendRequestButton (props) {
    const { className, requestId, ...other } = props;
    const dispatch                           = useAppDispatch();

    return (
        <ButtonWithLoading
            { ...other }
            className={ className }
            onClick={ () => dispatch(acceptFriendRequest(requestId)) }
            quad
            styleType={ ButtonStyleType.PRIMARY }
        >
            <IoPersonAdd/>
        </ButtonWithLoading>
    );
});