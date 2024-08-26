import { FC, memo } from 'react';
import { ButtonProps } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoCall } from 'react-icons/io5';
import {
    createCallAnswerEffect,
} from '@/app/model/call/call.model.ts';
import { DomainCallOffer } from 'product-types/dist/call/DomainCallOffer';


export type CreateCallAnswerButtonProps =
    {
        userId: string;
        offer: DomainCallOffer;
    }
    & ButtonProps;

export const CreateCallAnswerButton: FC<CreateCallAnswerButtonProps> = memo(function CreateCallOfferButton (props) {
    const { userId, offer, ...other } = props;

    return (
        <ButtonWithLoading
            { ...other }
            onClick={ () => createCallAnswerEffect(userId, offer) }
            quad
        >
            <IoCall/>
        </ButtonWithLoading>
    );
});