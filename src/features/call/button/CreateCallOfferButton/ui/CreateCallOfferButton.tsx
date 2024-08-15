import { FC, memo } from 'react';
import { ButtonProps } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoCall } from 'react-icons/io5';
import { createCallOfferEffect } from '@/app/model/call/call.model.ts';


export type CreateCallOfferButtonProps =
    {
        userId: string;
    }
    & ButtonProps;

export const CreateCallOfferButton: FC<CreateCallOfferButtonProps> = memo(function CreateCallOfferButton (props) {
    const { userId, ...other } = props;

    return (
        <ButtonWithLoading
            { ...other }
            onClick={ () => createCallOfferEffect(userId) }
            quad
        >
            <IoCall/>
        </ButtonWithLoading>
    );
});