import { MutableRefObject, useLayoutEffect, useRef } from 'react';
import {
    VirtualType,
} from '@/shared/ui-kit/box/InfinityVirtual_2/ui/Virtual.tsx';
import {
    getScrollDirection,
} from '@/shared/ui-kit/box/InfinityVirtual_2/lib/getScrollDirection/getScrollDirection.ts';
import {
    isNextScrollTrigger,
} from '@/shared/ui-kit/box/InfinityVirtual_2/lib/isNextScrollTrigger/isNextScrollTrigger.ts';
import {
    isPreviousScrollTrigger,
} from '@/shared/ui-kit/box/InfinityVirtual_2/lib/isPreviousScrollTrigger/isPreviousScrollTrigger.ts';
import {
    useVirtualPreviousItems,
} from '@/shared/ui-kit/box/InfinityVirtual_2/hooks/useVirtualPreviousItems.ts';
import {
    VirtualAction,
} from '@/shared/ui-kit/box/InfinityVirtual_2/hooks/useVirtualActions.ts';
import {
    isNextChanges,
} from '@/shared/ui-kit/box/InfinityVirtual_2/lib/isNextChanges/isNextChanges.ts';
import {
    isPreviousChanges,
} from '@/shared/ui-kit/box/InfinityVirtual_2/lib/isPreviousChanges/isPreviousChanges.ts';
import {
    getMaxPrevScrollPosition,
} from '@/shared/ui-kit/box/InfinityVirtual_2/lib/getMaxPrevScrollPosition/getMaxPrevScrollPosition.ts';
import {
    isEndOfScroll,
} from '@/shared/ui-kit/box/InfinityVirtual_2/lib/isEndOfScroll/isEndOfScroll.ts';
import {
    isStartOfScroll,
} from '@/shared/ui-kit/box/InfinityVirtual_2/lib/isStartOfScroll/isStartOfScroll.ts';
import {
    getMaxNextScrollPosition,
} from '@/shared/ui-kit/box/InfinityVirtual_2/lib/getMaxNextScrollPosition/getMaxNextScrollPosition.ts';


export type UseVirtualScrollProps = {
    type: VirtualType;
    smoothScroll: boolean;
    distanceToTrigger: number;
    virtualItems: Array<unknown>;
    virtualAction: MutableRefObject<VirtualAction>;
    nextHandler: () => void;
    prevHandler: () => void;
    otherHandler: () => void;
}

export type UseVirtualScroll = {
    ref: MutableRefObject<HTMLDivElement>;
}

export enum VirtualScrollDirection {
    NEXT,
    PREVIOUS,
    NONE,
}

export const useVirtualScroll = function (props: UseVirtualScrollProps): UseVirtualScroll {
    const containerRef        = useRef<HTMLDivElement>(null);
    const previousScrollTop   = useRef<number>(0);
    const previousOffsetWidth = useRef<number>(0);
    const scrollDirection     = useRef<VirtualScrollDirection>(VirtualScrollDirection.PREVIOUS);
    const lastHandler         = useRef<VirtualScrollDirection>(VirtualScrollDirection.NEXT);
    const previous            = useVirtualPreviousItems(props.virtualItems);

    // Update scroll when virtualItems is changed
    useLayoutEffect(() => {
        switch (props.virtualAction.current) {
            case VirtualAction.AUTOSCROLL:
                if (isNextChanges({
                    type         : props.type,
                    previousLast : previous.last.current,
                    previousFirst: previous.first.current,
                    items        : props.virtualItems,
                })) {
                    containerRef.current.scrollTo({
                        top     : getMaxNextScrollPosition(props.type),
                        behavior: props.smoothScroll ? 'smooth' : 'instant',
                    });
                }
                break;
            case VirtualAction.TOGGLE_NEXT:
            case VirtualAction.LOADING_NEXT:
                if (isNextChanges({
                    type         : props.type,
                    previousLast : previous.last.current,
                    previousFirst: previous.first.current,
                    items        : props.virtualItems,
                })) {
                    containerRef.current.scrollTo({
                        top: getMaxNextScrollPosition(props.type),
                    });
                }
                break;
            case VirtualAction.TOGGLE_PREVIOUS:
            case VirtualAction.LOADING_PREVIOUS:
                if (isPreviousChanges({
                    type         : props.type,
                    previousLast : previous.last.current,
                    previousFirst: previous.first.current,
                    items        : props.virtualItems,
                })) {
                    containerRef.current.scrollTo({
                        top: getMaxPrevScrollPosition({
                            type     : props.type,
                            scrollTop: containerRef.current.scrollTop,
                        }),
                    });
                }
                break;
            default:
                break;
        }

        previous.update(props.virtualItems);
        // need only virtual items
        // eslint-disable-next-line
    }, [ props.virtualItems ]);

    useLayoutEffect(() => {
        const ref = containerRef.current;

        if (ref) {
            previousScrollTop.current   = Math.abs(ref.scrollTop);
            previousOffsetWidth.current = ref.offsetWidth;

            const onScrollHandler = function () {
                const {
                          scrollTop,
                          scrollHeight,
                          offsetHeight,
                          offsetWidth,
                      } = ref;

                if (previousOffsetWidth.current !== offsetWidth) {
                    previousOffsetWidth.current = offsetWidth;

                    if (props.virtualAction.current === VirtualAction.AUTOSCROLL) {
                        ref.scrollTo({
                            top: getMaxNextScrollPosition(props.type),
                        });
                    }
                    return;
                }

                if (isStartOfScroll(scrollTop)) {
                    ref.scrollTo({
                        top: getMaxNextScrollPosition(props.type),
                    });
                    return;
                }

                if (isEndOfScroll({ scrollHeight, offsetHeight, scrollTop })) {
                    ref.scrollTo({
                        top: getMaxPrevScrollPosition({
                            type: props.type,
                            scrollTop,
                        }),
                    });
                    return;
                }

                scrollDirection.current = getScrollDirection({
                    previous: previousScrollTop.current,
                    current : scrollTop,
                });

                if (isNextScrollTrigger({
                    scrollDirection  : scrollDirection.current,
                    scrollTop,
                    distanceToTrigger: props.distanceToTrigger,
                })) {
                    if (lastHandler.current !== VirtualScrollDirection.NEXT) {
                        lastHandler.current = VirtualScrollDirection.NEXT;
                        props.nextHandler();
                    }
                } else if (isPreviousScrollTrigger({
                    scrollDirection  : scrollDirection.current,
                    scrollTop,
                    distanceToTrigger: props.distanceToTrigger,
                    offsetHeight,
                    scrollHeight,
                })) {
                    if (lastHandler.current !== VirtualScrollDirection.PREVIOUS) {
                        lastHandler.current = VirtualScrollDirection.PREVIOUS;
                        props.prevHandler();
                    }
                } else if (previousScrollTop.current !== Math.abs(scrollTop)) {
                    lastHandler.current = VirtualScrollDirection.NONE;
                    props.otherHandler();
                }

                previousScrollTop.current   = Math.abs(scrollTop);
                previousOffsetWidth.current = ref.offsetWidth;
            };

            onScrollHandler();

            ref.addEventListener('scroll', onScrollHandler);
            return () => ref.removeEventListener('scroll', onScrollHandler);
        }
    }, [ props ]);

    return { ref: containerRef };
};