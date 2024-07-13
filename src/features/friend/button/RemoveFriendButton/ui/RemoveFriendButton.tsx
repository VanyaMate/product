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
import { useTranslation } from 'react-i18next';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';


export type RemoveFriendButtonProps =
    {
        userId: string;
    }
    & ButtonProps;

export const RemoveFriendButton: FC<RemoveFriendButtonProps> = memo(function RemoveFriendButton (props) {
    const { className, userId, ...other } = props;
    const { t }                           = useTranslation([ 'friends-page' ]);

    return (
        <PopOver popover={ t('remove_from_friends') }>
            <ButtonWithLoading
                { ...other }
                aria-label={ t('remove_from_friends') }
                className={ className }
                onClick={ () => removeFriendEffect(userId) }
                quad
                styleType={ ButtonStyleType.DANGER }
            >
                <IoPersonRemove/>
            </ButtonWithLoading>
        </PopOver>
    );
});