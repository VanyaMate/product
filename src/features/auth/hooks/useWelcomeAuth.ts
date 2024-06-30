import { useEffect } from 'react';
import { refreshAuthEffect } from '@/app/model/auth/auth.model.ts';


export const useWelcomeAuth = function () {
    useEffect(() => {
        refreshAuthEffect();
    }, []);
};