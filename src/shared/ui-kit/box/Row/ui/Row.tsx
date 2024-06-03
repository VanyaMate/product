import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './Row.module.scss';


export type RowProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const Row: FC<RowProps> = memo(function Row (props) {
    const { className, ...other } = props;

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        />
    );
});