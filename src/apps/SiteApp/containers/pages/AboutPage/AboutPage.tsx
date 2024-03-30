import React, { Suspense } from 'react';
import PageLoader from '@/components/shared/ui/loaders/PageLoader/PageLoader.tsx';
import ErrorBoundary from '@/components/shared/ui/errors/ErrorBoundary/ErrorBoundary.tsx';


const AboutPageContent = React.lazy(() => import('./ui/AboutPageContent.tsx'));

export type AboutPageProps = {};

const AboutPage: React.FC<AboutPageProps> = (props) => {
    const {} = props;

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <AboutPageContent/>
            </ErrorBoundary>
        </Suspense>
    );
};

export default React.memo(AboutPage);