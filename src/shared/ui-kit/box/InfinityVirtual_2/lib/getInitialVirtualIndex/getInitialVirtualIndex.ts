import {
    VirtualType,
} from '@/shared/ui-kit/box/InfinityVirtual_2/ui/Virtual.tsx';
import {
    isTop,
} from '@/shared/ui-kit/box/InfinityVirtual_2/lib/isTop/isTop.ts';


export type GetInitialVirtualIndexProps = {
    type: VirtualType;
    items: Array<unknown>;
    showAmount: number;
}

export const getInitialVirtualIndex = function (props: GetInitialVirtualIndexProps) {
    if (isTop(props.type)) {
        return 0;
    }

    if (props.items.length > props.showAmount) {
        return props.items.length - props.showAmount;
    }

    return 0;
};