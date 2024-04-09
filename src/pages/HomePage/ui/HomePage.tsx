import { FC, memo, Suspense, lazy } from 'react';
import { ErrorBoundary, PageLoader } from '@/shared/ui-kit';


const HomePageContent = lazy(() => import('./HomePageContent.tsx'));


export type HomePageProps = {};

export const HomePage: FC<HomePageProps> = memo(function HomePage (props) {
    const {} = props;

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <HomePageContent/>
            </ErrorBoundary>
        </Suspense>
    );
});