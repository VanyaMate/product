import { isTop } from '@/shared/ui-kit/box/Virtual/lib/isTop/isTop.ts';
import { VirtualType } from '@/shared/ui-kit/box/Virtual/types/types.ts';


export type IsPreviousScrollPosition = {
    type: VirtualType;
    scrollTop: number;
    previousScrollTop: number;
    scrollHeight: number;
    offsetHeight: number;
    distanceToTrigger: number;
}


export const isPreviousScrollPosition = function (props: IsPreviousScrollPosition): boolean {
    const {
              type,
              distanceToTrigger,
              previousScrollTop,
              scrollHeight,
              scrollTop,
              offsetHeight,
          } = props;

    if (isTop(type)) {
        const isBottomScroll: boolean = scrollTop > previousScrollTop;

        if (isBottomScroll) {
            return scrollHeight - offsetHeight - scrollTop <= distanceToTrigger;
        }

        return false;
    }

    const isTopScroll: boolean = scrollTop < previousScrollTop;

    if (isTopScroll) {
        return scrollHeight - offsetHeight - Math.abs(scrollTop) <= distanceToTrigger;
    }

    return false;
};