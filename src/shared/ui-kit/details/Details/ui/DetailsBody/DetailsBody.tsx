import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './DetailsBody.module.scss';


export type DetailsBodyProps =
    {}
    & ComponentPropsWithoutRef<'section'>;

export const DetailsBody: FC<DetailsBodyProps> = memo(function DetailsBody (props) {
    const { className, ...other } = props;

    return (
        <section
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        />
    );
});