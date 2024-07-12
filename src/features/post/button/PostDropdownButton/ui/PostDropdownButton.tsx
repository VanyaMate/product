import { FC, memo } from 'react';
import { Dropdown } from '@/shared/ui-kit/modal/Dropdown/ui/Dropdown.tsx';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { IoEllipsisHorizontal } from 'react-icons/io5';
import {
    useDropdownController,
} from '@/shared/ui-kit/modal/Dropdown/hooks/useDropdownController.ts';
import {
    DropdownPostMenu,
} from '@/widgets/posts/DropdownPostMenu/ui/DropdownPostMenu.tsx';


export type PostDropdownButtonProps =
    {
        postId: string;
    }
    & ButtonProps;

export const PostDropdownButton: FC<PostDropdownButtonProps> = memo(function PostDropdownButton (props) {
    const { postId, ...other } = props;
    const dropdownController   = useDropdownController();

    return (
        <Dropdown
            controller={ dropdownController }
            dropdownContent={ <DropdownPostMenu postId={ postId }/> }
        >
            <Button
                { ...other }
                quad
                styleType={ ButtonStyleType.GHOST }
            >
                <IoEllipsisHorizontal/>
            </Button>
        </Dropdown>
    );
});