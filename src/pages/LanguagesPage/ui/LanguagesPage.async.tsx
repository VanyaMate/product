import { FC, lazy, memo, Suspense } from 'react';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import {
    ErrorBoundary,
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { useTitle } from '@/entities/site/hooks/useTitle/useTitle.ts';


const LanguagesPage = lazy(() => import('./LanguagesPage.tsx').then((data) => ({
    default: data.LanguagesPage,
})));

export const LanguagesPageAsync: FC = memo(function LanguagesPageAsync () {
    const { t } = useTranslation();

    useTitle(t.app.languages_page);

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <LanguagesPage/>
            </ErrorBoundary>
        </Suspense>
    );
});