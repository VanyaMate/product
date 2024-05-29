import { FC, memo } from 'react';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { IoPersonAdd } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';


export type AddToFriendButtonProps =
    {}
    & ButtonProps;

export const AddToFriendButton: FC<AddToFriendButtonProps> = memo(function AddToFriendButton (props) {
    const { className, ...other } = props;

    return (
        <Button
            { ...other }
            className={ className }
            quad
            styleType={ ButtonStyleType.PRIMARY }
        >
            <IoPersonAdd/>
        </Button>
    );
});