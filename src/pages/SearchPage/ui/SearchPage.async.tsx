import { FC, lazy, memo, Suspense } from 'react';
import {
    PageLoader
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import {
    ErrorBoundary
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';


const SearchPage = lazy(() => import('./SearchPage.tsx').then((data) => ({
    default: data.SearchPage,
})));

export type SearchPageAsyncProps = {};

export const SearchPageAsync: FC<SearchPageAsyncProps> = memo(function SearchPageAsync (props) {
    const {} = props;

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <SearchPage/>
            </ErrorBoundary>
        </Suspense>
    );
});