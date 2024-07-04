import { lazy } from 'react';


export const UserSignUpFormWithLoginAsync = lazy(async () => {
    const { UserSignUpFormWithLoginEmail } = await import('./UserSignUpFormWithLoginEmail.tsx');
    return { default: UserSignUpFormWithLoginEmail };
});