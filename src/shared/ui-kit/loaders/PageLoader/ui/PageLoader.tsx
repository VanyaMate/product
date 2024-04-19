import { FC, memo } from 'react';
import css from './PageLoader.module.scss';
import { Loader } from '@/shared/ui-kit/loaders/Loader/ui/Loader.tsx';


export type PageLoaderProps = {};

export const PageLoader: FC<PageLoaderProps> = memo(function PageLoader (props) {
    const {} = props;

    return (
        <div className={ css.container }>
            <Loader/>
        </div>
    );
});