import { FC, memo, Suspense, lazy } from 'react';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import {
    ErrorBoundary,
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { usePageTitle } from '@/entities/site/hooks/useTitle/usePageTitle.ts';


const HomePageContent = lazy(() => import('./HomePage.tsx'));


export type HomePageProps = {};

export const HomePageAsync: FC<HomePageProps> = memo(function HomePage (props) {
    const {}    = props;
    const { t } = useTranslation();

    usePageTitle(t.app.logo);

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <HomePageContent/>
            </ErrorBoundary>
        </Suspense>
    );
});