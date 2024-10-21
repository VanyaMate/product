import { FC, memo } from 'react';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { IoArrowRedoSharp } from 'react-icons/io5';
import {
    ButtonStyleType,
} from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';


export type ForwardButtonProps =
    {
        amount: number;
    }
    & ButtonProps;

export const ForwardButton: FC<ForwardButtonProps> = memo(function ForwardButton (props) {
    const { styleType, amount, ...other } = props;

    return (
        <PopOver popover="Forward">
            <Button
                { ...other }
                styleType={ styleType ?? ButtonStyleType.GHOST }
            >
                <IoArrowRedoSharp/>
                <span>{ amount }</span>
            </Button>
        </PopOver>
    );
});