import { Suspense, lazy, FC, memo } from 'react';
import { ErrorBoundary, PageLoader } from '@/shared/ui-kit';


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