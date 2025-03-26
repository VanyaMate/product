import { useLayoutEffect, useRef } from 'react';
import {
    $authIsPending,
    refreshAuthEffect,
} from '@/app/model/auth/auth.model.ts';
import { useStore } from '@vanyamate/sec-react';
import { logError } from '@/app/console/logError.ts';


export const useWelcomeAuth = function () {
    const send        = useRef<boolean>(true);
    const authPending = useStore($authIsPending);

    useLayoutEffect(() => {
        if (!authPending && send.current) {
            send.current = false;
            refreshAuthEffect().catch(logError('refreshAuthEffect'));
        }
    }, [ authPending ]);
};