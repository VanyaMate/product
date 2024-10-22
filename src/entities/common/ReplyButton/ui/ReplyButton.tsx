import { FC, memo } from 'react';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { IoArrowUndoSharp } from 'react-icons/io5';


export type ReplyButtonProps =
    {
        amount: number;
    }
    & ButtonProps;

export const ReplyButton: FC<ReplyButtonProps> = memo(function ReplyButton (props) {
    const { styleType, amount, ...other } = props;

    return (
        <PopOver popover="Reply">
            <Button
                { ...other }
                styleType={ styleType ?? ButtonStyleType.GHOST }
            >
                <IoArrowUndoSharp/>
                <span>{ amount }</span>
            </Button>
        </PopOver>
    );
});