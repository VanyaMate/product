import { FC, memo } from 'react';
import css from './UserHeaderControlMenu.module.scss';
import { useStore } from '@vanyamate/sec-react';
import { $authUser } from '@/app/model/auth/auth.model.ts';
import { Dropdown } from '@/shared/ui-kit/modal/Dropdown/ui/Dropdown.tsx';
import {
    useDropdownController,
} from '@/shared/ui-kit/modal/Dropdown/hooks/useDropdownController.ts';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    UserAvatar,
} from '@/entities/user/avatar/UserAvatar/ui/UserAvatar.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    UserHeaderDropdownMenu,
} from '@/widgets/user/menu/UserHeaderDropdownMenu/ui/UserHeaderDropdownMenu.tsx';


export type UserHeaderProfileButtonProps = {};

export const UserHeaderControlMenu: FC<UserHeaderProfileButtonProps> = memo(function UserHeaderControlMenu () {
    const userData = useStore($authUser);
    const dropdown = useDropdownController();

    return (
        <Dropdown
            className={ css.container }
            controller={ dropdown }
            dropdownContent={
                <UserHeaderDropdownMenu/>
            }
        >
            <Button
                className={ css.button }
                styleType={ ButtonStyleType.GHOST }
            >
                <UserAvatar
                    avatar={ userData.avatar }
                    className={ css.avatar }
                    login={ userData.login }
                />
                <span>
                    { userData.login }
                </span>
            </Button>
        </Dropdown>
    );
});