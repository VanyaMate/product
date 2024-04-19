import { FC, memo, Suspense, lazy } from 'react';
import { PageLoader } from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import { ErrorBoundary } from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';


const HomePageContent = lazy(() => import('./HomePage.tsx'));


export type HomePageProps = {};

export const HomePageAsync: FC<HomePageProps> = memo(function HomePage (props) {
    const {} = props;

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <HomePageContent/>
            </ErrorBoundary>
        </Suspense>
    );
});