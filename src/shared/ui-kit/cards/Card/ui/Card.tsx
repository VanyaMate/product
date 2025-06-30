import { type ComponentPropsWithoutRef, type FC, memo } from 'react';
import classNames from 'classnames';
import css from './Card.module.css';


export type CardVariant =
    'default'
    | 'main'
    | 'primary'
    | 'danger'
    | 'gold'
    | 'success';

export type CardProps =
    {
        variant?: CardVariant;
    }
    & ComponentPropsWithoutRef<'div'>;

export const Card: FC<CardProps> = memo(function Card (props) {
    const {
              variant = 'default',
              className,
              ...other
          } = props;

    return (
        <div { ...other }
             className={ classNames(css.container, { [css[variant]]: true }, [ className ]) }/>
    );
});