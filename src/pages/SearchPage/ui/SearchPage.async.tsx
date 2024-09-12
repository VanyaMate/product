import { FC, lazy, memo, Suspense } from 'react';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import {
    ErrorBoundary,
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { useTitle } from '@/entities/site/hooks/useTitle/useTitle.ts';


const SearchPage = lazy(() => import('./SearchPage.tsx').then((data) => ({
    default: data.SearchPage,
})));

export type SearchPageAsyncProps = {};

export const SearchPageAsync: FC<SearchPageAsyncProps> = memo(function SearchPageAsync (props) {
    const {}    = props;
    const { t } = useTranslation();

    useTitle(t.app.search_page);

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <SearchPage/>
            </ErrorBoundary>
        </Suspense>
    );
});