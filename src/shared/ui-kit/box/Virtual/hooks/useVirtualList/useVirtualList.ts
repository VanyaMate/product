import { useCallback, useRef, useState } from 'react';
import {
    getInitialIndex,
} from '@/shared/ui-kit/box/Virtual/lib/getInitialIndex/getInitialIndex.ts';
import {
    getVirtualList,
} from '@/shared/ui-kit/box/Virtual/lib/getVirtualList/getVirtualList.ts';
import {
    VirtualIndexSetter, VirtualList,
    VirtualType,
} from '@/shared/ui-kit/box/Virtual/types/types.ts';


export type UseVirtualListProps = {
    type: VirtualType;
    list: VirtualList;
    showAmount: number;
}

export const useVirtualList = function (props: UseVirtualListProps) {
    const { type, list, showAmount } = props;

    const currentIndex                    = useRef<number>(
        getInitialIndex({ type, showAmount, listLength: list.length }),
    );
    const [ virtualList, setVirtualList ] = useState<VirtualList>(
        getVirtualList({ index: currentIndex.current, list, showAmount }),
    );

    const setIndex = useCallback<VirtualIndexSetter>((index: number) => {
        console.log('set index', index);
        currentIndex.current = index;
        setVirtualList(
            getVirtualList({ index, list, showAmount }),
        );
    }, [ list, showAmount ]);

    return { currentIndex, virtualList, setIndex };
};