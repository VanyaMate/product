import { Suspense, lazy, FC, memo } from 'react';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import {
    ErrorBoundary,
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { usePageTitle } from '@/entities/site/hooks/useTitle/usePageTitle.ts';


const AboutPageContent = lazy(() => import('./AboutPage.tsx'));

export type AboutPageProps = {};

export const AboutPageAsync: FC<AboutPageProps> = memo(function AboutPage (props) {
    const {} = props;
    const { t } = useTranslation();

    usePageTitle(t.app.about_us_page);

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <AboutPageContent/>
            </ErrorBoundary>
        </Suspense>
    );
});