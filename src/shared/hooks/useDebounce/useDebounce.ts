import { useRef } from 'react';


export type DebounceCallback = () => any;

export const useDebounce = function (ms: number) {
    const timer = useRef<ReturnType<typeof setTimeout>>();

    return (callback: DebounceCallback) => {
        clearTimeout(timer.current);
        timer.current = setTimeout(callback, ms);
    };
};