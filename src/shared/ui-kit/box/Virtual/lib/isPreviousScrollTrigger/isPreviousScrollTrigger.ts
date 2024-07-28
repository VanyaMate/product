import {
    VirtualScrollDirection,
} from '@/shared/ui-kit/box/Virtual/hooks/useVirtualScroll.ts';


export type IsPreviousScrollTriggerProps = {
    distanceToTrigger: number;
    scrollTop: number;
    scrollHeight: number;
    offsetHeight: number;
    scrollDirection: VirtualScrollDirection;
}

export const isPreviousScrollTrigger = function (props: IsPreviousScrollTriggerProps): boolean {
    const inRange: boolean = props.scrollHeight - props.offsetHeight - Math.abs(props.scrollTop) < props.distanceToTrigger;
    return inRange && props.scrollDirection === VirtualScrollDirection.PREVIOUS;
};