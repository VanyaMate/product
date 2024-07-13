import { FC, memo } from 'react';
import { Dropdown } from '@/shared/ui-kit/modal/Dropdown/ui/Dropdown.tsx';
import {
    useDropdownController,
} from '@/shared/ui-kit/modal/Dropdown/hooks/useDropdownController.ts';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    PrivateMessageActionsMenu,
} from '@/widgets/message/PrivateMessageActionsMenu/ui/PrivateMessageActionsMenu.tsx';
import { IoClose, IoEllipsisHorizontal } from 'react-icons/io5';
import {
    ButtonSizeType,
    ButtonStyleType,
} from '@/shared/ui-kit/buttons/Button/types/types.ts';


export type PrivateMessageDropdownButtonProps =
    {
        messageId: string;
    }
    & ButtonProps;

export const PrivateMessageDropdownButton: FC<PrivateMessageDropdownButtonProps> = memo(function PrivateMessageDropdownButton (props) {
    const { messageId, ...other } = props;
    const dropdownController      = useDropdownController();

    return (
        <Dropdown
            controller={ dropdownController }
            dropdownContent={
                <PrivateMessageActionsMenu messageId={ messageId }/>
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