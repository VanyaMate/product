import { Dispatch, SetStateAction, useCallback } from 'react';


export const useStepsHandlers = function (
    elementsAmount: number,
    showAmount: number,
    currentIndex: number,
    setIndex: Dispatch<SetStateAction<number>>,
    getPreviousElements: () => Promise<void>,
    getNextElements: () => Promise<void>,
) {
    const stepPrevious = useCallback(async () => {
        if (currentIndex === 0) {
            return getPreviousElements?.().then(() => setIndex((prev) => Math.max(prev - showAmount / 2, 0)));
        } else {
            return setIndex((prev) => Math.max(prev - showAmount / 2, 0));
        }
    }, [ getPreviousElements, currentIndex, setIndex, showAmount ]);

    const stepNext = useCallback(async () => {
        const range   = elementsAmount - showAmount;
        const inRange = currentIndex > range;
        if (!inRange) {
            return setIndex((prev) => Math.min(prev + showAmount / 2, range));
        } else {
            return getNextElements?.().then(() => setIndex((prev) => Math.min(prev + showAmount / 2, range)));
        }
    }, [ elementsAmount, getNextElements, currentIndex, setIndex, showAmount ]);

    return [ stepPrevious, stepNext ];
};