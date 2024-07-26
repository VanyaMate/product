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
import {
    first,
    getFullIndexOffset,
    getItemsByRange,
    getStartVirtualItemsIndex,
} from '@/shared/ui-kit/box/InfinityVirtual/lib/lib.ts';


export type UseVirtualItems = {
    index: number;
    virtualItems: Array<unknown>;
    setIndex: Dispatch<SetStateAction<number>>;
    setVirtualItems: Dispatch<SetStateAction<Array<unknown>>>;
}

export type UseVirtualItemsProps = {
    items: Array<unknown>;
    showAmount: number;
    side: InfinityVirtualSide;
}

export const useVirtualItems = function (props: UseVirtualItemsProps): UseVirtualItems {
    // States
    const [ index, setIndex ]               = useState<number>(getStartVirtualItemsIndex(props.items.length, props.showAmount, props.side));
    const [ virtualItems, setVirtualItems ] = useState<Array<unknown>>(getItemsByRange(props.items, index, props.showAmount));

    // Previous states
    const previousFirstItems  = useRef<unknown>(first(props.items));
    const previousLengthItems = useRef<number>(props.items.length);

    // Change index and items if items length is changed
    useLayoutEffect(() => {
        const lengthOfItemsChanged: boolean = previousLengthItems.current !== props.items.length;

        if (lengthOfItemsChanged) {
            const currentFirstItem: unknown = first(props.items);
            const firstItemChanged: boolean = previousFirstItems.current !== currentFirstItem;
            let targetIndex: number         = index;

            if (firstItemChanged) {
                const needFullOffset = index !== 0;

                if (needFullOffset) {
                    const offset = getFullIndexOffset(
                        virtualItems.length,
                        props.showAmount,
                        previousLengthItems.current,
                        props.items.length,
                    );
                    targetIndex  = index + offset;
                    setIndex(targetIndex);
                }
            }

            setVirtualItems(getItemsByRange(props.items, targetIndex, props.showAmount));
            previousLengthItems.current = props.items.length;
            previousFirstItems.current  = currentFirstItem;
        }
    }, [ props.items.length, index, virtualItems.length, props.items, props.showAmount ]);

    return { index, virtualItems, setIndex, setVirtualItems };
};