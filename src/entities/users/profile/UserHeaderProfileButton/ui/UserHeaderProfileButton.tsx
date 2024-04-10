import { FC, memo } from 'react';
import { User } from '@/app';
import { ButtonStyleType, ButtonWithFixes } from '@/shared/ui-kit';
import { AiOutlineUser } from 'react-icons/ai';


export type UserHeaderProfileButtonProps = {
    user: User;
    onClick: (user: User) => void;
};

export const UserHeaderProfileButton: FC<UserHeaderProfileButtonProps> = memo(function UserHeaderProfileButton (props) {
    const { user, onClick } = props;

    return (
        <ButtonWithFixes
            onClick={ () => onClick(user) }
            pref={
                <AiOutlineUser/>
            }
            styleType={ ButtonStyleType.GHOST }
        >
            { user.username }
        </ButtonWithFixes>
    );
});