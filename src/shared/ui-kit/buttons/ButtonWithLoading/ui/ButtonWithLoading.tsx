import {
    FC,
    memo,
    useCallback,
    useLayoutEffect, useRef,
    useState,
} from 'react';
import classNames from 'classnames';
import css from './ButtonWithLoading.module.scss';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { IoSync } from 'react-icons/io5';


export type ButtonWithLoadingProps =
    {
        onClick?: () => Promise<unknown>;
        loading?: boolean;
    }
    & Omit<ButtonProps, 'onClick'>;

export const ButtonWithLoading: FC<ButtonWithLoadingProps> = memo(function ButtonWithLoading (props) {
    const {
              className,
              children,
              quad,
              onClick,
              disabled,
              loading,
              ...other
          }                             = props;
    const [ pending, setPending ]       = useState<boolean>(loading ?? false);
    const [ prePending, setPrePending ] = useState<boolean>(false);
    const loader                        = useRef<HTMLSpanElement>();

    const onClickHandler = useCallback(() => {
        if (onClick) {
            setPending(true);
            onClick().finally(() => setPending(false));
        }
    }, [ onClick ]);

    useLayoutEffect(() => {
        if (loading) {
            setPrePending(true);
            const update         = function () {
                setPending(true);
            };
            const animationFrame = requestAnimationFrame(update);
            return () => {
                cancelAnimationFrame(animationFrame);
            };
        } else {
            setPending(false);
            const loaderElement   = loader.current;
            const onTransitionEnd = function () {
                setPrePending(false);
            };
            loaderElement.addEventListener('transitionend', onTransitionEnd);
            return () => {
                loaderElement.removeEventListener('transitionend', onTransitionEnd);
            };
        }
    }, [ loading ]);

    useLayoutEffect(() => {

    }, [ prePending ]);

    return (
        <Button
            { ...other }
            className={ classNames(css.container, {
                [css.pending]   : pending,
                [css.prePending]: prePending,
            }, [ className ]) }
            disabled={ disabled || pending }
            onClick={ onClickHandler }
            quad={ quad }
        >
            <span className={ classNames(css.box, { [css.quad]: quad }) }>
                <span className={ css.children }>{ children }</span>
                <span className={ css.loader } ref={ loader }>
                    <IoSync className={ css.rotating }/>
                </span>
            </span>
        </Button>
    );
});