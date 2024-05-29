import { FC, lazy, memo, Suspense } from 'react';
import { PageLoader } from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import { ErrorBoundary } from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';


const UserPage = lazy(() => import('./UserPage.tsx').then((data) => ({
    default: data.UserPage,
})));

export type UserPageAsyncProps = {};

export const UserPageAsync: FC<UserPageAsyncProps> = memo(function UserPageAsync (props) {
    const {} = props;

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <UserPage/>
            </ErrorBoundary>
        </Suspense>
    );
});