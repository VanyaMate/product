import {
    VirtualType,
} from '@/shared/ui-kit/box/Virtual/ui/Virtual.tsx';
import {
    isTop,
} from '@/shared/ui-kit/box/Virtual/lib/isTop/isTop.ts';


export type isStartOfItemsProps = {
    type: VirtualType;
    currentIndex: number;
    itemsLength: number;
    showAmount: number;
}

export const isStartOfItems = function (props: isStartOfItemsProps): boolean {
    if (isTop(props.type)) {
        return props.currentIndex === 0;
    } else {
        return props.itemsLength - props.currentIndex <= props.showAmount;
    }
};