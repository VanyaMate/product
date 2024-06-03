import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './Col.module.scss';


export type ColProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const Col: FC<ColProps> = memo(function Col (props) {
    const { className, ...other } = props;

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        />
    );
});