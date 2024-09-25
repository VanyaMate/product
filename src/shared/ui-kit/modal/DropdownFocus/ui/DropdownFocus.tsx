import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './DropdownFocus.module.scss';


export type DropdownFocusProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const DropdownFocus: FC<DropdownFocusProps> = memo(function DropdownFocus (props) {
    const { className, ...other } = props;

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            DropdownFocus Component
        </div>
    );
});