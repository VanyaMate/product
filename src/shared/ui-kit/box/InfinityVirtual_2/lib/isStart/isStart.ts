import {
    VirtualType,
} from '@/shared/ui-kit/box/InfinityVirtual_2/ui/Virtual.tsx';
import {
    isTop,
} from '@/shared/ui-kit/box/InfinityVirtual_2/lib/isTop/isTop.ts';


export type IsStartProps = {
    type: VirtualType;
    currentIndex: number;
    itemsLength: number;
    showAmount: number;
}

export const isStart = function (props: IsStartProps): boolean {
    if (isTop(props.type)) {
        return props.currentIndex === 0;
    } else {
        return props.itemsLength - props.currentIndex <= props.showAmount;
    }
};