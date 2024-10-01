import { ComponentPropsWithoutRef, FC, lazy, memo, Suspense } from 'react';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import {
    ErrorBoundary,
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';


export type ExcelPageProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

const ExcelPageAsync = lazy(() => import('./ExcelPage.async.tsx').then((data) => ({
    default: data.ExcelPageAsync,
})));

export const ExcelPage: FC<ExcelPageProps> = memo(function ExcelPage () {
    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <ExcelPageAsync/>
            </ErrorBoundary>
        </Suspense>
    );
});