import {
    VirtualScrollDirection,
} from '@/shared/ui-kit/box/Virtual/hooks/useVirtualScroll.ts';


export type GetScrollDirectionProps = {
    previous: number;
    current: number;
}


export const getScrollDirection = function (props: GetScrollDirectionProps): VirtualScrollDirection {
    return props.previous >= Math.abs(props.current)
           ? VirtualScrollDirection.NEXT : VirtualScrollDirection.PREVIOUS;
};