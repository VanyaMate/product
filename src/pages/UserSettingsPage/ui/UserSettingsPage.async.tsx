import { FC, lazy, memo, Suspense } from 'react';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import {
    ErrorBoundary,
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { useTitle } from '@/entities/site/hooks/useTitle/useTitle.ts';


const UserSettingsPage = lazy(() => import('./UserSettingsPage.tsx').then((data) => ({
    default: data.UserSettingsPage,
})));


export const UserSettingsPageAsync: FC = memo(function UserSettingsPageAsync () {
    const { t } = useTranslation();

    useTitle(t.app.settings_page);

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <UserSettingsPage/>
            </ErrorBoundary>
        </Suspense>
    );
});