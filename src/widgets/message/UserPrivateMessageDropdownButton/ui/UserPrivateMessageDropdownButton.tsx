import { FC, memo } from 'react';
import { Dropdown } from '@/shared/ui-kit/modal/Dropdown/ui/Dropdown.tsx';
import {
    useDropdownController,
} from '@/shared/ui-kit/modal/Dropdown/hooks/useDropdownController.ts';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { IoClose, IoEllipsisHorizontal } from 'react-icons/io5';
import {
    ButtonSizeType,
    ButtonStyleType,
} from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    UserPrivateMessageActionsMenu,
} from '@/widgets/message/UserPrivateMessageActionsMenu/ui/UserPrivateMessageActionsMenu.tsx';


export type UserPrivateMessageDropdownButtonProps =
    {
        messageId: string;
    }
    & ButtonProps;

export const UserPrivateMessageDropdownButton: FC<UserPrivateMessageDropdownButtonProps> = memo(function UserPrivateMessageDropdownButton (props) {
    const { messageId, ...other } = props;
    const dropdownController      = useDropdownController();

    return (
        <Dropdown
            controller={ dropdownController }
            dropdownContent={
                <UserPrivateMessageActionsMenu messageId={ messageId }/>
            }
        >
            <Button
                { ...other }
                quad
                size={ ButtonSizeType.SMALL }
                styleType={ ButtonStyleType.GHOST }
            >
                {
                    dropdownController.opened
                    ? <IoClose/>
                    : <IoEllipsisHorizontal/>
                }
            </Button>
        </Dropdown>
    );
});