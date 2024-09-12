import { FC, lazy, memo, Suspense } from 'react';
import {
    ErrorBoundary,
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { useTitle } from '@/entities/site/hooks/useTitle/useTitle.ts';


const DialoguesPage = lazy(() => import('./DialoguesPage.tsx').then((data) => ({
    default: data.DialoguesPage,
})));

export type DialoguesPageAsyncProps = {};

export const DialoguesPageAsync: FC<DialoguesPageAsyncProps> = memo(function DialoguesPageAsync (props) {
    const {}    = props;
    const { t } = useTranslation();

    useTitle(t.app.dialogues_page);

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <DialoguesPage/>
            </ErrorBoundary>
        </Suspense>
    );
});