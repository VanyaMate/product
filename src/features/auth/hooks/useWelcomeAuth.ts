import { useEffect } from 'react';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import {
    authByTokens,
} from '@/app/redux/slices/auth/thunks/authByTokens/authByTokens.ts';


export const useWelcomeAuth = function () {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(authByTokens());
    }, [ dispatch ]);
};