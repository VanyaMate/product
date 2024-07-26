import { Dispatch, SetStateAction, useCallback } from 'react';


export type UseStepsHandlers = [
    () => Promise<void>,
    () => Promise<void>
]

export const useStepsHandlers = function (
    elementsAmount: number,
    showAmount: number,
    currentIndex: number,
    setIndex: Dispatch<SetStateAction<number>>,
    getPreviousElements: () => Promise<void>,
    getNextElements: () => Promise<void>,
): UseStepsHandlers {
    const partOfNextMessages: number = 4;

    const stepPrevious = useCallback(async () => {
        if (currentIndex === 0) {
            return getPreviousElements?.()
                .then(() => setIndex((prev) => Math.max(prev - showAmount / partOfNextMessages, 0)));
        } else {
            return setIndex((prev) => Math.max(prev - showAmount / partOfNextMessages, 0));
        }
    }, [ getPreviousElements, currentIndex, setIndex, showAmount ]);

    const stepNext = useCallback(async () => {
        const range   = elementsAmount - showAmount;
        const inRange = currentIndex > range;
        if (!inRange) {
            return setIndex((prev) => Math.min(prev + showAmount / partOfNextMessages, range));
        } else {
            return getNextElements?.()
                .then(() => setIndex((prev) => Math.min(prev + showAmount / partOfNextMessages, range)));
        }
    }, [ elementsAmount, getNextElements, currentIndex, setIndex, showAmount ]);

    return [ stepPrevious, stepNext ];
};