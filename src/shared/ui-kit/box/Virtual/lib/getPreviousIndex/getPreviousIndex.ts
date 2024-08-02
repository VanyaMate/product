import {
    VirtualType,
} from '@/shared/ui-kit/box/Virtual/ui/Virtual.tsx';
import {
    isTop,
} from '@/shared/ui-kit/box/Virtual/lib/isTop/isTop.ts';


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
        return Math.max(Math.min(maxIndex, props.currentIndex + offset), 0);
    } else {
        return Math.max(0, props.currentIndex - offset);
    }
};