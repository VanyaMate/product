import {
    VirtualType,
} from '@/shared/ui-kit/box/InfinityVirtual_2/ui/Virtual.tsx';
import {
    isTop,
} from '@/shared/ui-kit/box/InfinityVirtual_2/lib/isTop/isTop.ts';


export const getMaxNextScrollPosition = function (type: VirtualType) {
    return isTop(type) ? 1 : -1;
};