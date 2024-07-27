import {
    VirtualType,
} from '@/shared/ui-kit/box/InfinityVirtual_2/ui/Virtual.tsx';
import {
    VirtualScrollDirection,
} from '@/shared/ui-kit/box/InfinityVirtual_2/hooks/useVirtualScroll.ts';


export const getInitialVirtualScrollDirection = function (type: VirtualType): VirtualScrollDirection {
    return type === VirtualType.TOP ? VirtualScrollDirection.PREVIOUS
                                    : VirtualScrollDirection.NEXT;
};