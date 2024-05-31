import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './DetailsBody.module.scss';


export type DetailsBodyProps =
    {}
    & ComponentPropsWithoutRef<'summary'>;

export const DetailsBody: FC<DetailsBodyProps> = memo(function DetailsBody (props) {
    const { className, ...other } = props;

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        />
    );
});