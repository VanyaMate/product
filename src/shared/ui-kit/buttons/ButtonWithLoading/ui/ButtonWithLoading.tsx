import {
    FC,
    memo,
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import classNames from 'classnames';
import css from './ButtonWithLoading.module.scss';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    ButtonSizeType,
    ButtonStyleType,
} from '@/shared/ui-kit/buttons/Button/types/types.ts';


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
              size = ButtonSizeType.MEDIUM,
              styleType,
              loading,
              ...other
          }                       = props;
    const [ pending, setPending ] = useState<boolean>(loading ?? false);
    const [ error, setError ]     = useState<boolean>(false);
    const errorTimeout            = useRef<ReturnType<typeof setTimeout>>();

    const onClickHandler = useCallback(() => {
        if (onClick) {
            setPending(true);
            setError(false);

            onClick()
                .catch(() => {
                    setError(true);
                })
                .finally(() => {
                    setPending(false);
                });
        }
    }, [ onClick ]);

    useLayoutEffect(() => {
        setPending(loading);
    }, [ loading ]);

    useLayoutEffect(() => {
        clearTimeout(errorTimeout.current);

        if (error) {
            errorTimeout.current = setTimeout(() => {
                setError(false);
            }, 1000);
        }
    }, [ error ]);

    return (
        <Button
            { ...other }
            className={ classNames(css.container, {
                [css.pending]: pending,
                [css.error]  : error,
            }, [ className, css[size] ]) }
            disabled={ disabled || pending }
            onClick={ onClickHandler }
            quad={ quad }
            size={ size }
            styleType={ error ? ButtonStyleType.DANGER : styleType }
        >
            <span className={ css.children }>{ children }</span>
        </Button>
    );
});