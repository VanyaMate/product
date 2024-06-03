import { lazy } from 'react';


export const UserAuthFormWithUsernameAsync = lazy(async () => {
    const { UserAuthFormWithUsername } = await import('./UserAuthFormWithUsername.tsx');
    return { default: UserAuthFormWithUsername };
});