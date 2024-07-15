import { FC, lazy, memo, Suspense } from 'react';
import {
    ErrorBoundary,
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';


const FilesPage = lazy(() => import('./FilesPage.tsx').then((data) => ({
    default: data.FilesPage,
})));

export type FilesPageAsyncProps = {};

export const FilesPageAsync: FC<FilesPageAsyncProps> = memo(function FilesPageAsync (props) {
    const {} = props;

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <FilesPage/>
            </ErrorBoundary>
        </Suspense>
    );
});