import { FC, memo } from 'react';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { IoNotificationsOff } from 'react-icons/io5';


export type UserMuteNotificationsButtonProps =
    {}
    & ButtonProps;

export const UserMuteNotificationsButton: FC<UserMuteNotificationsButtonProps> = memo(function UserMuteNotificationsButton (props) {
    const { ...other } = props;

    return (
        <Button
            { ...other }
            onClick={ () => {
            } }
            quad
            styleType={ ButtonStyleType.PRIMARY }
        >
            <IoNotificationsOff/>
        </Button>
    );
});