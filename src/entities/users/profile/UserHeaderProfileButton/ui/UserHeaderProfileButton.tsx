import { FC, memo } from 'react';
import { User } from '@/app';
import { ButtonStyleType, ButtonWithFixes } from '@/shared/ui-kit';
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import css from './UserHeaderProfileButton.module.scss';


export type UserHeaderProfileButtonProps = {
    user: User;
    onClick: (user: User) => void;
};

export const UserHeaderProfileButton: FC<UserHeaderProfileButtonProps> = memo(function UserHeaderProfileButton (props) {
    const { user, onClick } = props;
    const { t }             = useTranslation();

    return (
        <div className={ css.container }>
            <AiOutlineUser/>
            <span>{ user.username }</span>
            <ButtonWithFixes
                onClick={ () => onClick(user) }
                post={
                    <AiOutlineLogout/>
                }
                styleType={ ButtonStyleType.GHOST }
            >
                { t('logout_button') }
            </ButtonWithFixes>
        </div>
    );
});