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
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type CancelFriendRequestButtonProps =
    {
        requestId: string;
    }
    & ButtonProps;

export const CancelFriendRequestButton: FC<CancelFriendRequestButtonProps> = memo(function CancelFriendRequestButton (props) {
    const { className, requestId, ...other } = props;
    const { t }                              = useTranslation();

    return (
        <PopOver popover={ t.page.friends.cancel_friend_request }>
            <ButtonWithLoading
                { ...other }
                aria-label={ t.page.friends.cancel_friend_request }
                className={ className }
                onClick={ () => cancelFriendRequestEffect(requestId) }
                quad
                styleType={ ButtonStyleType.DANGER }
            >
                <IoPersonRemove/>
            </ButtonWithLoading>
        </PopOver>
    );
});