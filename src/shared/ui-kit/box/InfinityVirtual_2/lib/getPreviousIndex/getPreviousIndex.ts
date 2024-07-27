import {
    VirtualType,
} from '@/shared/ui-kit/box/InfinityVirtual_2/ui/Virtual.tsx';
import {
    isTop,
} from '@/shared/ui-kit/box/InfinityVirtual_2/lib/isTop/isTop.ts';


export type GetPreviousIndexProps = {
    type: VirtualType;
    showAmount: number;
    currentIndex: number;
    itemsLength: number;
}

export const getPreviousIndex = function (props: GetPreviousIndexProps) {
    const offset: number = Math.ceil(props.showAmount / 4);

    if (isTop(props.type)) {
        const maxIndex: number = props.itemsLength - props.showAmount;
        return Math.min(maxIndex, props.currentIndex + offset);
    } else {
        return Math.max(0, props.currentIndex - offset);
    }
};