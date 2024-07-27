import { useCallback, useRef } from 'react';
import {
    first,
} from '@/shared/ui-kit/box/InfinityVirtual_2/lib/first/first.ts';
import { last } from '@/shared/ui-kit/box/InfinityVirtual_2/lib/last/last.ts';


export const useVirtualPreviousItems = function (items: Array<unknown>) {
    const previousFirstItem   = useRef<unknown>(first(items));
    const previousLastItem    = useRef<unknown>(last(items));
    const previousItemsLength = useRef<number>(items.length);

    const update = useCallback((items: Array<unknown>) => {
        previousFirstItem.current   = first(items);
        previousLastItem.current    = last(items);
        previousItemsLength.current = items.length;
    }, []);

    return {
        first : previousFirstItem,
        last  : previousLastItem,
        length: previousItemsLength,
        update,
    };
};