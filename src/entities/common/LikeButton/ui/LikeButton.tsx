import {
    FC,
    memo,
    useCallback,
    useLayoutEffect,
    useMemo,
    useState,
} from 'react';
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
        onLike: () => Promise<any>;
        onUnlike: () => Promise<any>;
    }
    & ButtonWithLoadingProps;

export const LikeButton: FC<LikeButtonProps> = memo(function LikeButton (props) {
    const {
              className, liked, styleType, amount, onUnlike, onLike, ...other
          }                                           = props;
    const [ currentLikedState, setCurrentLikedState ] = useState<boolean>(liked);

    useLayoutEffect(() => {
        setCurrentLikedState(liked);
    }, [ liked ]);

    const onClickHandler = useCallback(async () => {
        if (currentLikedState) {
            return onUnlike().then(() => setCurrentLikedState(false));
        } else {
            return onLike().then(() => setCurrentLikedState(true));
        }
    }, [ currentLikedState, onLike, onUnlike ]);

    const currentAmount = useMemo(() => {
        if (currentLikedState) {
            if (liked) {
                return amount;
            } else {
                return amount + 1;
            }
        } else {
            if (liked) {
                return amount - 1;
            } else {
                return amount;
            }
        }
    }, [ amount, currentLikedState, liked ]);

    return (
        <PopOver popover={ liked ? 'Dislike' : 'Like' }>
            <ButtonWithLoading
                { ...other }
                className={ classNames(css.container, {}, [ className ]) }
                onClick={ onClickHandler }
                styleType={ currentLikedState
                            ? styleType ?? ButtonStyleType.PRIMARY
                            : ButtonStyleType.GHOST }
            >
                { currentLikedState ? <IoHeart/> : <IoHeartSharp/> }
                <span>{ currentAmount }</span>
            </ButtonWithLoading>
        </PopOver>
    );
});