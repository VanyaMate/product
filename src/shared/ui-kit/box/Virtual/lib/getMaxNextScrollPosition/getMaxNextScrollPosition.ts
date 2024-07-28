import {
    VirtualType,
} from '@/shared/ui-kit/box/Virtual/ui/Virtual.tsx';
import {
    isTop,
} from '@/shared/ui-kit/box/Virtual/lib/isTop/isTop.ts';


export const getMaxNextScrollPosition = function (type: VirtualType) {
    return isTop(type) ? 1 : -1;
};