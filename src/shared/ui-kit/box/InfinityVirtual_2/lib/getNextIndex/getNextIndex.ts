import {
    VirtualType,
} from '@/shared/ui-kit/box/InfinityVirtual_2/ui/Virtual.tsx';
import {
    isTop,
} from '@/shared/ui-kit/box/InfinityVirtual_2/lib/isTop/isTop.ts';


export type GetNextIndexProps = {
    type: VirtualType;
    showAmount: number;
    currentIndex: number;
    itemsLength: number;
}

export const getNextIndex = function (props: GetNextIndexProps): number {
    const offset: number = Math.ceil(props.showAmount / 4);

    if (isTop(props.type)) {
        return Math.max(0, props.currentIndex - offset);
    } else {
        const maxIndex: number = props.itemsLength - props.showAmount;
        return Math.max(Math.min(maxIndex, props.currentIndex + offset), 0);
    }
};