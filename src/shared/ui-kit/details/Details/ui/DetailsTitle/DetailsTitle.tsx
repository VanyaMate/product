import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './DetailsTitle.module.scss';


export type DetailsTitleProps =
    {}
    & ComponentPropsWithoutRef<'summary'>;

export const DetailsTitle: FC<DetailsTitleProps> = memo(function DetailsTitle (props) {
    const { className, ...other } = props;

    return (
        <summary
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        />
    );
});