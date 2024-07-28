import {
    VirtualScrollDirection,
} from '@/shared/ui-kit/box/Virtual/hooks/useVirtualScroll.ts';


export type IsNextScrollTriggerProps = {
    distanceToTrigger: number;
    scrollTop: number;
    scrollDirection: VirtualScrollDirection;
}

export const isNextScrollTrigger = function (props: IsNextScrollTriggerProps): boolean {
    return Math.abs(props.scrollTop) < props.distanceToTrigger && props.scrollDirection === VirtualScrollDirection.NEXT;
};