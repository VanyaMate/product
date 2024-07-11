import { ComponentPropsWithoutRef, FC, memo } from 'react';
import css from './Loader.module.scss';
import classNames from 'classnames';


export type LoaderProps = {} & ComponentPropsWithoutRef<'div'>;

export const Loader: FC<LoaderProps> = memo(function Loader (props) {
    const { className, ...other } = props;

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }/>
    );
});