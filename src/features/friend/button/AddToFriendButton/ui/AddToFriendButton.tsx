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
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type AddToFriendButtonProps =
    {
        userId: string;
    }
    & ButtonProps;

export const AddToFriendButton: FC<AddToFriendButtonProps> = memo(function AddToFriendButton (props) {
    const { className, userId, ...other } = props;
    const { t }                           = useTranslation();

    return (
        <PopOver popover={ t.page.friends.add_to_friends }>
            <ButtonWithLoading
                { ...other }
                aria-label={ t.page.friends.add_to_friends }
                className={ className }
                onClick={ () => createFriendRequestEffect(userId) }
                quad
                styleType={ ButtonStyleType.PRIMARY }
            >
                <IoPersonAdd/>
            </ButtonWithLoading>
        </PopOver>
    );
});