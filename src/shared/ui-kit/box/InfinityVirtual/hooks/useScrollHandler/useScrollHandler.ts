import { useRef } from 'react';


export const useScrollHandler = function () {
    const containerRef = useRef<HTMLDivElement>(null);

    return containerRef;
};