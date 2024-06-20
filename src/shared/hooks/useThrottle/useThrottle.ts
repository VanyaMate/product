import { useCallback, useRef } from 'react';


export const useThrottle = function (delay: number): (callback: () => unknown) => void {
    const delayTimer   = useRef<ReturnType<typeof setTimeout>>(null);
    const nextCallback = useRef<() => unknown>(null);
    const next         = function () {
        if (typeof nextCallback.current === 'function') {
            const callback       = nextCallback.current;
            nextCallback.current = null;
            delayTimer.current   = setTimeout(next, delay);
            callback();
        } else {
            delayTimer.current   = null;
            nextCallback.current = null;
        }
    };

    return useCallback((callback) => {
        if (delayTimer.current) {
            nextCallback.current = callback;
        } else {
            delayTimer.current = setTimeout(next, delay);
            callback();
        }
        // Не нужно сюда добавлять next. Он работает с ref-ами и delay
        // динамически будет обновляться всё равно
        // eslint-disable-next-line
    }, [ delay ]);
};