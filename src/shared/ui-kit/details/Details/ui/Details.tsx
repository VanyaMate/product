import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './Details.module.scss';


export type DetailsProps =
    {}
    & ComponentPropsWithoutRef<'details'>;

export const Details: FC<DetailsProps> = memo(function Details (props) {
    const { className, ...other } = props;

    return (
        <details
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        />
    );
});