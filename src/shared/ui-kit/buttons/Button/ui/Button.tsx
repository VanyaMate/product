import {
    ComponentPropsWithRef,
    FC,
    forwardRef,
    memo,
    MutableRefObject,
} from 'react';
import classNames from 'classnames';
import css from './Button.module.scss';
import { ButtonSizeType, ButtonStyleType } from '../types/types.ts';


export type ButtonProps =
    {
        styleType?: ButtonStyleType;
        size?: ButtonSizeType;
        quad?: boolean;
    }
    & ComponentPropsWithRef<'button'>;

export const Button: FC<ButtonProps> = memo(forwardRef(function Button (props, ref: MutableRefObject<HTMLButtonElement>) {
    const {
              styleType = ButtonStyleType.PRIMARY,
              size      = ButtonSizeType.MEDIUM,
              quad      = false,
              className,
              type,
              ...other
          } = props;

    return (
        <button
            { ...other }
            className={ classNames(css.container, { [css.quad]: quad }, [ className, css[styleType], css[size] ]) }
            ref={ ref }
            type={ type ? type : 'button' }
        />
    );
}));