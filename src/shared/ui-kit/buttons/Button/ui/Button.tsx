import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './Button.module.scss';
import { ButtonStyleType } from '../types/types.ts';


export type ButtonProps =
    {
        styleType?: ButtonStyleType;
    }
    & ComponentPropsWithoutRef<'button'>;

export const Button: FC<ButtonProps> = memo(function Button (props) {
    const {
              styleType = ButtonStyleType.PRIMARY,
              className,
              type,
              ...other
          } = props;

    return (
        <button
            { ...other }
            className={ classNames(css.container, {}, [ className, css[styleType] ]) }
            type={ type ? type : 'button' }
        />
    );
});