import {
    VirtualType,
} from '@/shared/ui-kit/box/Virtual/ui/Virtual.tsx';
import {
    isTop,
} from '@/shared/ui-kit/box/Virtual/lib/isTop/isTop.ts';


export type GetLastIndexProps = {
    type: VirtualType;
    itemsLength: number;
    showAmount: number;
}

export const getLastIndex = function (props: GetLastIndexProps) {
    if (isTop(props.type)) {
        return 0;
    }

    return Math.max(props.itemsLength - props.showAmount, 0);
};