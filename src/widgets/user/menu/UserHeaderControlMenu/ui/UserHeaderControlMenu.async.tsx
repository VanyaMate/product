import { FC, lazy, memo, Suspense } from 'react';
import {
    ErrorBoundary,
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';
import { Loader } from '@/shared/ui-kit/loaders/Loader/ui/Loader.tsx';


export const UserHeaderControlMenu = lazy(async () => {
    const { UserHeaderControlMenu } = await import('./UserHeaderControlMenu.tsx');
    return { default: UserHeaderControlMenu };
});

export type UserHeaderControlMenuAsyncProps = {};

export const UserHeaderControlMenuAsync: FC<UserHeaderControlMenuAsyncProps> = memo(function UserHeaderControlMenuAsync () {
    return (
        <Suspense fallback={ <Loader/> }>
            <ErrorBoundary>
                <UserHeaderControlMenu/>
            </ErrorBoundary>
        </Suspense>
    );
});