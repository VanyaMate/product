import { FC, lazy, memo, Suspense } from 'react';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import {
    ErrorBoundary,
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';


const LanguagesPage = lazy(() => import('./LanguagesPage.tsx').then((data) => ({
    default: data.LanguagesPage,
})));

export const LanguagesPageAsync: FC = memo(function LanguagesPageAsync () {
    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <LanguagesPage/>
            </ErrorBoundary>
        </Suspense>
    );
});