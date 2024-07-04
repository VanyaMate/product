import { lazy } from 'react';


export const UserSignInFormWithLoginAsync = lazy(async () => {
    const { UserSignInFormWithLogin } = await import('./UserSignInFormWithLogin.tsx');
    return { default: UserSignInFormWithLogin };
});