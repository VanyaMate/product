import {
    InfinityVirtualSide,
} from '@/shared/ui-kit/box/InfinityVirtual/types/InfinityVirtualSide.type.ts';
import { MutableRefObject, useEffect, useRef } from 'react';


const getSideItem = function (data: Array<unknown>, side: InfinityVirtualSide) {
    return data.length ? side === 'top' ? data[0] : data.slice(-1)[0] : null;
};

export const useAutoScroll = function (
    data: Array<unknown>,
    showAmount: number,
    index: number,
    side: InfinityVirtualSide,
    ref: MutableRefObject<HTMLDivElement>,
    enable: boolean,
) {
    const sideItem = useRef<unknown>(getSideItem(data, side));

    useEffect(() => {
        if (enable && ref.current) {
            console.log('IsEnabled');
            const currentSideItem     = getSideItem(data, side);
            const isDifferentSideItem = sideItem.current !== currentSideItem;
            console.log('IsDifferentSideItem', isDifferentSideItem);

            if (isDifferentSideItem) {
                const isScrollOnTop = Math.abs(ref.current.parentElement.scrollTop) < 300;
                const isFirstItems  = side === 'top' ? index === 0
                                                     : index >= data.length - showAmount;

                console.log('IsScrollOnTop', isScrollOnTop);
                console.log('isFirstItems', isFirstItems, index, data.length, showAmount);

                if (isScrollOnTop && isFirstItems) {
                    ref.current.parentElement.scrollTo({
                        top     : 0,
                        behavior: 'smooth',
                    });
                }
            }

            sideItem.current = currentSideItem;
        }
    }, [ data, data.length, enable, index, ref, showAmount, side ]);
};