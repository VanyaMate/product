import {
    VirtualScrollDirection,
} from '@/shared/ui-kit/box/Virtual/hooks/useVirtualScroll.ts';


export type GetScrollDirectionProps = {
    previous: number;
    current: number;
}


export const getScrollDirection = function (props: GetScrollDirectionProps): VirtualScrollDirection {
    const previous: number = Math.abs(props.previous);
    const current: number  = Math.abs(props.current);

    if (Math.abs(previous - current) > 50) {
        return VirtualScrollDirection.NONE;
    }

    if (previous > current) {
        return VirtualScrollDirection.NEXT;
    }

    if (previous < current) {
        return VirtualScrollDirection.PREVIOUS;
    }

    return VirtualScrollDirection.NONE;
};