import {
    VirtualType,
} from '@/shared/ui-kit/box/InfinityVirtual_2/ui/Virtual.tsx';
import {
    isTop,
} from '@/shared/ui-kit/box/InfinityVirtual_2/lib/isTop/isTop.ts';


export type isEndOfItemsProps = {
    type: VirtualType;
    currentIndex: number;
    itemsLength: number;
    showAmount: number;
}

export const isEndOfItems = function (props: isEndOfItemsProps): boolean {
    if (isTop(props.type)) {
        return props.itemsLength - props.currentIndex === props.showAmount;
    } else {
        return props.currentIndex === 0;
    }
};