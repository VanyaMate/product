import { FC, lazy, memo, Suspense } from 'react';
import { ErrorBoundary, PageLoader } from '@/shared/ui-kit';


const ProfilePage = lazy(() => import('./ProfilePage.tsx').then((data) => ({
    default: data.ProfilePage,
})));

export type ProfilePageAsyncProps = {};

export const ProfilePageAsync: FC<ProfilePageAsyncProps> = memo(function ProfilePageAsync (props) {
    const {} = props;

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <ProfilePage/>
            </ErrorBoundary>
        </Suspense>
    );
});