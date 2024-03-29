import React from 'react';
import { ButtonStyleType } from '@/components/shared/ui/buttons/Button/types/types.ts';
import classNames from 'classnames';
import css from './Button.module.scss';


export type ButtonProps =
    {
        styleType?: ButtonStyleType;
    }
    & React.ComponentPropsWithoutRef<'button'>;

const Button: React.FC<ButtonProps> = (props) => {
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
};

export default React.memo(Button);