import { FC, memo } from 'react';
import {
    ButtonWithLoading,
    ButtonWithLoadingProps,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoHeart, IoHeartSharp } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import classNames from 'classnames';
import css from './LikeButton.module.scss';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';


export type LikeButtonProps =
    {
        liked: boolean;
        amount: number;
    }
    & ButtonWithLoadingProps;

export const LikeButton: FC<LikeButtonProps> = memo(function LikeButton (props) {
    const { className, liked, styleType, amount, ...other } = props;

    return (
        <PopOver popover={ liked ? 'Dislike' : 'Like' }>
            <ButtonWithLoading
                { ...other }
                className={ classNames(css.container, {}, [ className ]) }
                styleType={ liked ? styleType ?? ButtonStyleType.PRIMARY
                                  : ButtonStyleType.GHOST }
            >
                { liked ? <IoHeart/> : <IoHeartSharp/> }
                <span>{ liked ? amount + 1 : amount }</span>
            </ButtonWithLoading>
        </PopOver>
    );
});