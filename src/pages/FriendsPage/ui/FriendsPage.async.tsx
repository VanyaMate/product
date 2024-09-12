import { FC, lazy, memo, Suspense } from 'react';
import {
    ErrorBoundary,
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { useTitle } from '@/entities/site/hooks/useTitle/useTitle.ts';


const FriendsPage = lazy(() => import('./FriendsPage.tsx').then((data) => ({
    default: data.FriendsPage,
})));

export type FriendsPageAsyncProps = {};

export const FriendsPageAsync: FC<FriendsPageAsyncProps> = memo(function FriendsPageAsync (props) {
    const {}    = props;
    const { t } = useTranslation();

    useTitle(t.app.friends_page);

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <FriendsPage/>
            </ErrorBoundary>
        </Suspense>
    );
});