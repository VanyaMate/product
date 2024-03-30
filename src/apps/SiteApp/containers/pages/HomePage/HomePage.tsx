import React, { Suspense } from 'react';
import PageLoader from '@/components/shared/ui/loaders/PageLoader/PageLoader.tsx';
import ErrorBoundary from '@/components/shared/ui/errors/ErrorBoundary/ErrorBoundary.tsx';


const HomePageContent = React.lazy(() => import('./ui/HomePageContent.tsx'));


export type HomePageProps = {};

const HomePage: React.FC<HomePageProps> = (props) => {
    const {} = props;

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <HomePageContent/>
            </ErrorBoundary>
        </Suspense>
    );
};

export default React.memo(HomePage);