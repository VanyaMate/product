import { lazy } from 'react';


export const UserAuthFormWithUsernameByJsonServerAsync = lazy(async () => {
    const { UserAuthFormWithUsernameByJsonServer } = await import('./UserAuthFormWithUsernameByJsonServer.tsx');
    return { default: UserAuthFormWithUsernameByJsonServer };
});