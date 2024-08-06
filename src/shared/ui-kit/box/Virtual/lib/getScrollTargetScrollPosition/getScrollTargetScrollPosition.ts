import { VirtualType } from '@/shared/ui-kit/box/Virtual/types/types.ts';
import { isTop } from '@/shared/ui-kit/box/Virtual/lib/isTop/isTop.ts';
import {
    calculateScrollPositionForVirtualTop,
} from '@/shared/ui-kit/box/Virtual/lib/calculateScrollPositionForVirtualTop/calculateScrollPositionForVirtualTop.ts';
import {
    calculateScrollPositionForVirtualBottom,
} from '@/shared/ui-kit/box/Virtual/lib/calculateScrollPositionForVirtualBottom/calculateScrollPositionForVirtualBottom.ts';


export type GetScrollTargetScrollPositionProps = {
    type: VirtualType;
    offset: number;
    currentTarget: number;
    scrollHeight: number;
    offsetHeight: number;
    scrollDistance: number;
}

export const getScrollTargetScrollPosition = function (props: GetScrollTargetScrollPositionProps): number | null {
    const {
              type,
              currentTarget,
              offset,
              offsetHeight,
              scrollHeight,
              scrollDistance,
          } = props;

    if (isTop(type)) {
        return calculateScrollPositionForVirtualTop({
            scrollDistance,
            scrollHeight,
            offsetHeight,
            currentTarget,
            offset,
        });
    } else {
        return calculateScrollPositionForVirtualBottom({
            scrollDistance,
            scrollHeight,
            offsetHeight,
            currentTarget,
            offset,
        });
    }
};