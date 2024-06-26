import { FC, lazy, memo, Suspense } from 'react';
import {
    ErrorBoundary,
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';


const DialoguesPage = lazy(() => import('./DialoguesPage.tsx').then((data) => ({
    default: data.DialoguesPage,
})));

export type DialoguesPageAsyncProps = {};

export const DialoguesPageAsync: FC<DialoguesPageAsyncProps> = memo(function DialoguesPageAsync (props) {
    const {} = props;

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <DialoguesPage/>
            </ErrorBoundary>
        </Suspense>
    );
});