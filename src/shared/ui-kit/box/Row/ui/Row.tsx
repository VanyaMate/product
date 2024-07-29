import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './Row.module.scss';


export type RowProps =
    {
        spaceBetween?: boolean;
        fullWidth?: boolean;
    }
    & ComponentPropsWithoutRef<'div'>;

export const Row: FC<RowProps> = memo(function Row (props) {
    const {
              spaceBetween = false,
              fullWidth    = false,
              className,
              ...other
          } = props;

    return (
        <div
            { ...other }
            className={ classNames(css.container, {
                [css.spaceBetween]: spaceBetween,
                [css.fullWidth]   : fullWidth,
            }, [ className ]) }
        />
    );
});