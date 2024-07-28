import {
    VirtualType,
} from '@/shared/ui-kit/box/Virtual/ui/Virtual.tsx';
import {
    VirtualScrollDirection,
} from '@/shared/ui-kit/box/Virtual/hooks/useVirtualScroll.ts';


export const getInitialVirtualScrollDirection = function (type: VirtualType): VirtualScrollDirection {
    return type === VirtualType.TOP ? VirtualScrollDirection.PREVIOUS
                                    : VirtualScrollDirection.NEXT;
};