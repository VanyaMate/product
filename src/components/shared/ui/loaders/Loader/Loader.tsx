import React from 'react';
import css from './Loader.module.scss';


export type LoaderProps = {};

const Loader: React.FC<LoaderProps> = (props) => {
    const {} = props;

    return (
        <div className={ css.container }/>
    );
};

export default React.memo(Loader);