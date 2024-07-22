import {
    Dispatch,
    SetStateAction,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import {
    InfinityVirtualSide,
} from '@/shared/ui-kit/box/InfinityVirtual/types/InfinityVirtualSide.type.ts';


export type UseVisibleElementIndex = [ number, Dispatch<SetStateAction<number>> ];

export const useVisibleElementIndex = function (data: Array<unknown>, showAmount: number, side: InfinityVirtualSide): UseVisibleElementIndex {
    const previousFirstElement = useRef(data[0]);
    const previousLastElement  = useRef(data.slice(-1)[0]);
    const previousDataLength   = useRef(data.length);

    const [ index, setIndex ] = useState<number>(
        side === 'top' ? 0 : Math.max(data.length - showAmount, 0),
    );

    useLayoutEffect(() => {
        const newItemsInStart = previousFirstElement.current !== data[0];
        const newItemsInEnd   = previousLastElement.current !== data.slice(-1)[0];
        const deltaLength     = Math.max(Math.min(data.length - previousDataLength.current, data.length - showAmount), 0);

        if (side === 'top') {
            if (newItemsInStart) {
                if (index !== 0) {
                    setIndex((prev) => prev + deltaLength);
                }
            }
        } else if (side === 'bottom') {
            if (newItemsInEnd) {
                const scrollRange   = data.length - showAmount;
                const inScrollRange = index >= scrollRange;
                if (inScrollRange) {
                    setIndex(scrollRange);
                }
            } else if (newItemsInStart) {
                setIndex((prev) => prev + deltaLength);
            }
        }

        previousFirstElement.current = data[0];
        previousLastElement.current  = data.slice(-1)[0];
        previousDataLength.current   = data.length;
    }, [ data, index, showAmount, side ]);

    return [ index, setIndex ];
};