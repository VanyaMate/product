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
    UserAvatarSize,
} from '@/entities/user/avatar/UserAvatar/ui/UserAvatar.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    UserHeaderDropdownMenu,
} from '@/widgets/user/menu/UserHeaderDropdownMenu/ui/UserHeaderDropdownMenu.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';


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
                <Row>
                    <UserAvatar
                        avatar={ userData.avatar }
                        login={ userData.login }
                        size={ UserAvatarSize.SMALL }
                    />
                    <span>
                    { userData.login }
                </span>
                </Row>
            </Button>
        </Dropdown>
    );
});