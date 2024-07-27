import {
    Dispatch,
    SetStateAction, useLayoutEffect, useRef,
    useState,
} from 'react';
import {
    InfinityVirtualSide,
} from '@/shared/ui-kit/box/InfinityVirtual/types/InfinityVirtualSide.type.ts';
import {
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
    const previousLengthItems = useRef<number>(props.items.length);
    /*    const previousFirstItem   = useRef<unknown>(first(props.items));
     const previousLastItem    = useRef<unknown>(last(props.items));*/

    // Fill virtual items when all-items changed and virtual items is not
    // required
    useLayoutEffect(() => {
        const lengthOfItemsChanged: boolean = previousLengthItems.current !== props.items.length;
        const virtualItemsFilled: boolean   = virtualItems.length === props.showAmount;

        if (lengthOfItemsChanged && !virtualItemsFilled) {
            setVirtualItems(getItemsByRange(props.items, index, props.showAmount));
            previousLengthItems.current = props.items.length;
        }
    }, [ index, props.items, props.showAmount, virtualItems.length ]);

    return { index, virtualItems, setIndex, setVirtualItems };
};