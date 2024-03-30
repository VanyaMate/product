import React from 'react';
import css from './PageLoader.module.scss';
import Loader from '@/components/shared/ui/loaders/Loader/Loader.tsx';


export type PageLoaderProps = {};

const PageLoader: React.FC<PageLoaderProps> = (props) => {
    const {} = props;

    return (
        <div className={ css.container }>
            <Loader/>
        </div>
    );
};

export default React.memo(PageLoader);