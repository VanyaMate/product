import {
    VirtualType,
} from '@/shared/ui-kit/box/InfinityVirtual_2/ui/Virtual.tsx';
import { useLayoutEffect, useRef } from 'react';
import {
    VirtualIndexSetter,
} from '@/shared/ui-kit/box/InfinityVirtual_2/hooks/useVirtualItems.ts';
import {
    getLastIndex,
} from '@/shared/ui-kit/box/InfinityVirtual_2/lib/getLastIndex/getLastIndex.ts';


export type UseVirtualFillerProps = {
    type: VirtualType,
    virtualItemsLength: number;
    itemsLength: number;
    showAmount: number;
    setIndex: VirtualIndexSetter;
}

export const useVirtualFiller = function (props: UseVirtualFillerProps) {
    const previousLength = useRef<number>(props.itemsLength);

    useLayoutEffect(() => {
        if (props.virtualItemsLength !== props.showAmount && props.itemsLength !== previousLength.current) {
            props.setIndex(getLastIndex({
                type       : props.type,
                showAmount : props.showAmount,
                itemsLength: props.itemsLength,
            }));
        }

        previousLength.current = props.itemsLength;
    }, [ props, props.showAmount, props.virtualItemsLength ]);
};