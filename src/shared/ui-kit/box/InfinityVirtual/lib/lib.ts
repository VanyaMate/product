import {
    InfinityVirtualSide,
} from '@/shared/ui-kit/box/InfinityVirtual/types/InfinityVirtualSide.type.ts';


export const isTop = function (side: InfinityVirtualSide) {
    return side === 'top';
};

export const first = function (list: Array<unknown>) {
    return list[0];
};

export const last = function (list: Array<unknown>) {
    return list.slice(-1)[0];
};

export const getDifferentSide = function (side: InfinityVirtualSide): InfinityVirtualSide {
    return side === 'top' ? 'bottom' : 'top';
};

export const getStartVirtualItemsIndex = function (dataLength: number, showAmount: number, side: InfinityVirtualSide) {
    return isTop(side) ? 0 : Math.max(dataLength - showAmount, 0);
};

export const getItemsByRange = function (items: Array<unknown>, start: number, amount: number) {
    return items.slice(start, start + amount);
};

export const getFullIndexOffset = function (shownItemsLength: number, showAmount: number, previousLength: number, currentLength: number) {
    const requiredAmountIsShown: boolean = shownItemsLength === showAmount;

    if (requiredAmountIsShown) {
        return currentLength - previousLength;
    } else {
        return shownItemsLength;
    }
};

export const getScrollDirection = function (side: InfinityVirtualSide, previousScrollPosition: number, currentScrollPosition: number): InfinityVirtualSide {
    const currentGreater = previousScrollPosition < currentScrollPosition;

    if (isTop(side)) {
        return currentGreater ? 'bottom' : 'top';
    } else {
        return currentGreater ? 'top' : 'bottom';
    }
};