import { FC, lazy, memo, Suspense } from 'react';
import {
    ErrorBoundary,
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import { usePageTitle } from '@/entities/site/hooks/useTitle/usePageTitle.ts';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


const DialoguesPage = lazy(() => import('./DialoguesPage.tsx').then((data) => ({
    default: data.DialoguesPage,
})));

export type DialoguesPageAsyncProps = {};

export const DialoguesPageAsync: FC<DialoguesPageAsyncProps> = memo(function DialoguesPageAsync (props) {
    const {}    = props;
    const { t } = useTranslation();

    usePageTitle(t.app.dialogues_page);

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <DialoguesPage/>
            </ErrorBoundary>
        </Suspense>
    );
});