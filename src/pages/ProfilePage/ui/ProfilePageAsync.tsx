import { FC, lazy, memo, Suspense } from 'react';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import {
    ErrorBoundary,
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';
import { useTitle } from '@/entities/site/hooks/useTitle/useTitle.ts';
import { useParams } from 'react-router-dom';
import {
    SITE_ROUTE_PARAM_USER_LOGIN,
} from '@/app/routes/main-site/config/routes.tsx';


const ProfilePage = lazy(() => import('./ProfilePage.tsx').then((data) => ({
    default: data.ProfilePage,
})));

export type ProfilePageAsyncProps = {};

export const ProfilePageAsync: FC<ProfilePageAsyncProps> = memo(function ProfilePageAsync (props) {
    const {}                                       = props;
    const { [SITE_ROUTE_PARAM_USER_LOGIN]: login } = useParams<{
        [SITE_ROUTE_PARAM_USER_LOGIN]: string
    }>();

    useTitle(login);

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <ProfilePage/>
            </ErrorBoundary>
        </Suspense>
    );
});