import {
    ComponentPropsWithRef,
    FC, forwardRef,
    memo,
} from 'react';
import classNames from 'classnames';
import css from './Details.module.scss';


export type DetailsProps =
    {}
    & ComponentPropsWithRef<'details'>;

export const Details: FC<DetailsProps> = memo(forwardRef(function Details (props, ref) {
    const { className, ...other } = props;

    return (
        <details
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            ref={ ref }
        />
    );
}));