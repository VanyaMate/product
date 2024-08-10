import { FC, lazy, memo, Suspense } from 'react';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import {
    ErrorBoundary,
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';


const UserSettingsPage = lazy(() => import('./UserSettingsPage.tsx').then((data) => ({
    default: data.UserSettingsPage,
})));


export const UserSettingsPageAsync: FC = memo(function UserSettingsPageAsync () {
    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <UserSettingsPage/>
            </ErrorBoundary>
        </Suspense>
    );
});