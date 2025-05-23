import {
    FC,
    memo,
    useCallback,
    useLayoutEffect,
    useState,
} from 'react';
import classNames from 'classnames';
import css from './ButtonWithLoading.module.scss';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { ButtonSizeType } from '@/shared/ui-kit/buttons/Button/types/types.ts';


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
              loading,
              ...other
          }                       = props;
    const [ pending, setPending ] = useState<boolean>(loading ?? false);

    const onClickHandler = useCallback(() => {
        if (onClick) {
            setPending(true);
            onClick().finally(() => {
                setPending(false);
            });
        }
    }, [ onClick ]);

    useLayoutEffect(() => {
        setPending(loading);
    }, [ loading ]);

    return (
        <Button
            { ...other }
            className={ classNames(css.container, {
                [css.pending]: pending,
            }, [ className, css[size] ]) }
            disabled={ disabled || pending }
            onClick={ onClickHandler }
            quad={ quad }
            size={ size }
        >
            <span className={ css.children }>{ children }</span>
        </Button>
    );
});