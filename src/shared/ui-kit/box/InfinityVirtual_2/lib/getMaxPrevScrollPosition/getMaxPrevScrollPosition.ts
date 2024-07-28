import {
    VirtualType,
} from '@/shared/ui-kit/box/InfinityVirtual_2/ui/Virtual.tsx';
import {
    isTop,
} from '@/shared/ui-kit/box/InfinityVirtual_2/lib/isTop/isTop.ts';


export type GetMaxPrevScrollPositionProps = {
    type: VirtualType;
    scrollTop: number;
}

export const getMaxPrevScrollPosition = function (props: GetMaxPrevScrollPositionProps): number {
    return isTop(props.type) ? props.scrollTop + 1 : props.scrollTop - 1;
};