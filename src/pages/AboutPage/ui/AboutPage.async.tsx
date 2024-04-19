import { Suspense, lazy, FC, memo } from 'react';
import { PageLoader } from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import { ErrorBoundary } from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';


const AboutPageContent = lazy(() => import('./AboutPage.tsx'));

export type AboutPageProps = {};

export const AboutPageAsync: FC<AboutPageProps> = memo(function AboutPage (props) {
    const {} = props;

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <AboutPageContent/>
            </ErrorBoundary>
        </Suspense>
    );
});