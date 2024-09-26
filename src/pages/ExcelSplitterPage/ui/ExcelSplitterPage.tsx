import { ComponentPropsWithoutRef, FC, lazy, memo, Suspense } from 'react';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import {
    ErrorBoundary,
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';


export type ExcelSplitterPageProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

const ExcelSplitterPageAsync = lazy(() => import('./ExcelSplitterPage.async.tsx').then((data) => ({
    default: data.ExcelSplitterPageAsync,
})));

export const ExcelSplitterPage: FC<ExcelSplitterPageProps> = memo(function ExcelSplitterPage () {
    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <ExcelSplitterPageAsync/>
            </ErrorBoundary>
        </Suspense>
    );
});