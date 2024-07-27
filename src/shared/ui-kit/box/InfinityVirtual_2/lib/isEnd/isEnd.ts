import {
    VirtualType,
} from '@/shared/ui-kit/box/InfinityVirtual_2/ui/Virtual.tsx';
import {
    isTop,
} from '@/shared/ui-kit/box/InfinityVirtual_2/lib/isTop/isTop.ts';


export type IsEndProps = {
    type: VirtualType;
    currentIndex: number;
    itemsLength: number;
    showAmount: number;
}

export const isEnd = function (props: IsEndProps): boolean {
    if (isTop(props.type)) {
        return props.itemsLength - props.currentIndex === props.showAmount;
    } else {
        return props.currentIndex === 0;
    }
};