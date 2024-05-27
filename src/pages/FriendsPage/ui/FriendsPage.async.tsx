import { FC, lazy, memo, Suspense } from 'react';
import {
    ErrorBoundary,
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';


const FriendsPage = lazy(() => import('./FriendsPage.tsx').then((data) => ({
    default: data.FriendsPage,
})));

export type FriendsPageAsyncProps = {};

export const FriendsPageAsync: FC<FriendsPageAsyncProps> = memo(function FriendsPageAsync (props) {
    const {} = props;

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <FriendsPage/>
            </ErrorBoundary>
        </Suspense>
    );
});