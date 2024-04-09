import { FC, memo } from 'react';
import css from './Loader.module.scss';


export type LoaderProps = {};

export const Loader: FC<LoaderProps> = memo(function Loader (props) {
    const {} = props;

    return (
        <div className={ css.container }/>
    );
});