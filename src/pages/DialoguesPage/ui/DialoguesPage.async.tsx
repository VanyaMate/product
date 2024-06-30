import { FC, lazy, memo, Suspense, useEffect } from 'react';
import {
    ErrorBoundary,
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import {
    getListPrivateDialogueEffect,
} from '@/app/model/private-dialogues/private-dialogues.model.ts';


const DialoguesPage = lazy(() => import('./DialoguesPage.tsx').then((data) => ({
    default: data.DialoguesPage,
})));

export type DialoguesPageAsyncProps = {};

export const DialoguesPageAsync: FC<DialoguesPageAsyncProps> = memo(function DialoguesPageAsync (props) {
    const {} = props;

    useEffect(() => {
        getListPrivateDialogueEffect({ limit: 1000, query: '', offset: 0 });
    }, []);

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ErrorBoundary>
                <DialoguesPage/>
            </ErrorBoundary>
        </Suspense>
    );
});