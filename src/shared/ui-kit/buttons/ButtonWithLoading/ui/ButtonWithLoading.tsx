import { FC, memo, useCallback, useEffect, useState } from 'react';
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
          }                       = props;
    const [ pending, setPending ] = useState<boolean>(loading ?? false);

    const onClickHandler = useCallback(() => {
        if (onClick) {
            setPending(true);
            onClick().finally(() => setPending(false));
        }
    }, [ onClick ]);

    useEffect(() => {
        setPending(loading);
    }, [ loading ]);

    return (
        <Button
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            disabled={ disabled || pending }
            onClick={ onClickHandler }
            quad={ quad }
        >
            { pending ? <IoSync className={ css.rotating }/> : null }
            { (quad && pending) ? null : children }
        </Button>
    );
});