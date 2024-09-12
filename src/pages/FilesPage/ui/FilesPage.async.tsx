import { FC, lazy, memo, Suspense } from 'react';
import {
    ErrorBoundary,
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { useTitle } from '@/entities/site/hooks/useTitle/useTitle.ts';


const FilesPage = lazy(() => import('./FilesPage.tsx').then((data) => ({
    default: data.FilesPage,
})));

export type FilesPageAsyncProps = {};

export const FilesPageAsync: FC<FilesPageAsyncProps> = memo(function FilesPageAsync (props) {
    const {}    = props;
    const { t } = useTranslation();

    useTitle(t.app.files_page);

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <FilesPage/>
            </ErrorBoundary>
        </Suspense>
    );
});