import { FC, memo } from 'react';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { IoChatbox } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';


export type CommentButtonProps =
    {
        amount: number;
    }
    & ButtonProps;

export const CommentButton: FC<CommentButtonProps> = memo(function CommentButton (props) {
    const { amount, styleType, ...other } = props;

    return (
        <Button { ...other } styleType={ styleType ?? ButtonStyleType.GHOST }>
            <IoChatbox/>
            <span>{ amount }</span>
        </Button>
    );
});