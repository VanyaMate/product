import { FC, memo } from 'react';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { IoChatbox } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';


export type CommentButtonProps =
    {
        amount: number;
    }
    & ButtonProps;

export const CommentButton: FC<CommentButtonProps> = memo(function CommentButton (props) {
    const { amount, styleType, ...other } = props;

    return (
        <PopOver popover="Comments">
            <Button { ...other }
                    styleType={ styleType ?? ButtonStyleType.GHOST }>
                <IoChatbox/>
                <span>{ amount }</span>
            </Button>
        </PopOver>
    );
});