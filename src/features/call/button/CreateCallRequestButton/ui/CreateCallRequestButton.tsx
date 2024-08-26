import { FC, memo } from 'react';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { ButtonProps } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { IoCall } from 'react-icons/io5';
import { createCallRequestEffect } from '@/app/model/call/call.model.ts';


export type CreateCallRequestButtonProps =
    {
        userId: string;
    }
    & ButtonProps;

export const CreateCallRequestButton: FC<CreateCallRequestButtonProps> = memo(function CreateCallRequestButton (props) {
    const { userId, className, ...other } = props;

    return (
        <ButtonWithLoading
            { ...other }
            className={ className }
            onClick={ () => createCallRequestEffect(userId) }
        >
            <IoCall/>
        </ButtonWithLoading>
    );
});