import { VirtualType } from '@/shared/ui-kit/box/Virtual/types/types.ts';
import { isTop } from '@/shared/ui-kit/box/Virtual/lib/isTop/isTop.ts';


export type IsNextScrollPosition = {
    type: VirtualType;
    scrollTop: number;
    previousScrollTop: number;
    distanceToTrigger: number;
}

export const isNextScrollPosition = function (props: IsNextScrollPosition): boolean {
    const {
              type,
              distanceToTrigger,
              previousScrollTop,
              scrollTop,
          } = props;

    if (isTop(type)) {
        const isTopScroll: boolean = scrollTop < previousScrollTop;

        if (isTopScroll) {
            return scrollTop <= distanceToTrigger;
        }

        return false;
    }

    const isBottomScroll: boolean = scrollTop > previousScrollTop;

    if (isBottomScroll) {
        return Math.abs(scrollTop) <= distanceToTrigger;
    }

    return false;
};