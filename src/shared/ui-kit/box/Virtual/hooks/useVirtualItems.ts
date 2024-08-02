import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
    VirtualType,
} from '@/shared/ui-kit/box/Virtual/ui/Virtual.tsx';
import {
    getInitialVirtualIndex,
} from '@/shared/ui-kit/box/Virtual/lib/getInitialVirtualIndex/getInitialVirtualIndex.ts';
import {
    getVirtualItems,
} from '@/shared/ui-kit/box/Virtual/lib/getVirtualItems/getVirtualItems.ts';


export type UseVirtualItemsProps = {
    items: Array<unknown>;
    showAmount: number;
    type: VirtualType;
}

export type VirtualIndexSetter = (value: number) => void;

export type UseVirtualItems = {
    currentIndex: number;
    setCurrentIndex: VirtualIndexSetter;
    virtualItems: Array<unknown>;
}

export const useVirtualItems = function (props: UseVirtualItemsProps): UseVirtualItems {
    const [ index, setIndex ] = useState<number>(getInitialVirtualIndex(props));
    const [ items, setItems ] = useState<Array<unknown>>(getVirtualItems({
        index,
        items     : props.items,
        showAmount: props.showAmount,
    }));
    const refIndex            = useRef<number>(index);
    const previousLength      = useRef<number>(props.items.length);

    useLayoutEffect(() => {
        const itemsLengthNotChanged: boolean = previousLength.current === props.items.length;
        const itemsLengthDecreased: boolean  = previousLength.current > props.items.length;

        if (itemsLengthNotChanged || itemsLengthDecreased) {
            const virtualItems = getVirtualItems({
                index     : refIndex.current,
                items     : props.items,
                showAmount: props.showAmount,
            });
            setItems(virtualItems);
        }
        previousLength.current = props.items.length;
    }, [ props.items, props.showAmount ]);

    const setCurrentIndexCallback = useCallback((value: number) => {
        refIndex.current       = value;
        previousLength.current = props.items.length;
        setIndex(value);
        setItems(getVirtualItems({
            index     : value,
            items     : props.items,
            showAmount: props.showAmount,
        }));
    }, [ props.items, props.showAmount ]);

    return {
        currentIndex   : index,
        setCurrentIndex: setCurrentIndexCallback,
        virtualItems   : items,
    };
};