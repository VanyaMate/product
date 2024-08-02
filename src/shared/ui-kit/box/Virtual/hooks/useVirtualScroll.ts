import { MutableRefObject, useLayoutEffect, useRef } from 'react';
import { VirtualType } from '@/shared/ui-kit/box/Virtual/ui/Virtual.tsx';
import {
    getScrollDirection,
} from '@/shared/ui-kit/box/Virtual/lib/getScrollDirection/getScrollDirection.ts';
import {
    isNextScrollTrigger,
} from '@/shared/ui-kit/box/Virtual/lib/isNextScrollTrigger/isNextScrollTrigger.ts';
import {
    isPreviousScrollTrigger,
} from '@/shared/ui-kit/box/Virtual/lib/isPreviousScrollTrigger/isPreviousScrollTrigger.ts';
import {
    useVirtualPreviousItems,
} from '@/shared/ui-kit/box/Virtual/hooks/useVirtualPreviousItems.ts';
import {
    VirtualAction,
} from '@/shared/ui-kit/box/Virtual/hooks/useVirtualActions.ts';
import {
    isNextChanges,
} from '@/shared/ui-kit/box/Virtual/lib/isNextChanges/isNextChanges.ts';
import {
    isPreviousChanges,
} from '@/shared/ui-kit/box/Virtual/lib/isPreviousChanges/isPreviousChanges.ts';
import {
    getMaxPrevScrollPosition,
} from '@/shared/ui-kit/box/Virtual/lib/getMaxPrevScrollPosition/getMaxPrevScrollPosition.ts';
import {
    isEndOfScroll,
} from '@/shared/ui-kit/box/Virtual/lib/isEndOfScroll/isEndOfScroll.ts';
import {
    isStartOfScroll,
} from '@/shared/ui-kit/box/Virtual/lib/isStartOfScroll/isStartOfScroll.ts';
import {
    getMaxNextScrollPosition,
} from '@/shared/ui-kit/box/Virtual/lib/getMaxNextScrollPosition/getMaxNextScrollPosition.ts';


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
        console.log('---- Use Scroll', props.virtualAction.current);

        switch (props.virtualAction.current) {
            case VirtualAction.AUTOSCROLL:
                console.log('Autoscroll');
                if (isNextChanges({
                    type         : props.type,
                    previousLast : previous.last.current,
                    previousFirst: previous.first.current,
                    items        : props.virtualItems,
                })) {
                    console.log('Scrolling...');
                    containerRef.current.scrollTo({
                        top     : getMaxNextScrollPosition(props.type),
                        behavior: props.smoothScroll ? 'smooth' : 'instant',
                    });
                }
                break;
            case VirtualAction.TOGGLE_NEXT:
            case VirtualAction.LOADING_NEXT:
                console.log('Next');
                if (isNextChanges({
                    type         : props.type,
                    previousLast : previous.last.current,
                    previousFirst: previous.first.current,
                    items        : props.virtualItems,
                })) {
                    console.log('Scroll..');
                    containerRef.current.scrollTo({
                        top: getMaxNextScrollPosition(props.type),
                    });
                }
                break;
            case VirtualAction.TOGGLE_PREVIOUS:
            case VirtualAction.LOADING_PREVIOUS:
                console.log('Previous');
                if (isPreviousChanges({
                    type         : props.type,
                    previousLast : previous.last.current,
                    previousFirst: previous.first.current,
                    items        : props.virtualItems,
                })) {
                    console.log('Scroll..');
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
                console.log('On scroll handler with:');
                console.log('ScrollDirection:', scrollDirection.current);
                console.log('LastHandler:', lastHandler.current);
                console.log('ActionType:', props.virtualAction.current);

                const {
                          scrollTop,
                          scrollHeight,
                          offsetHeight,
                          offsetWidth,
                      } = ref;

                if (previousOffsetWidth.current !== offsetWidth) {
                    console.log('Offset change', previousOffsetWidth.current, offsetWidth);
                    previousOffsetWidth.current = offsetWidth;

                    if (props.virtualAction.current === VirtualAction.AUTOSCROLL) {
                        console.log('Autoscroll, scrolling...');
                        const scrollPosition: number = getMaxNextScrollPosition(props.type);
                        previousScrollTop.current    = scrollPosition;
                        ref.scrollTo({ top: scrollPosition });
                    }
                    return;
                }

                if (isStartOfScroll(scrollTop)) {
                    console.log('IsStartOfScroll');
                    const scrollPosition: number = getMaxNextScrollPosition(props.type);
                    previousScrollTop.current    = scrollPosition;
                    ref.scrollTo({ top: scrollPosition });
                    return;
                }

                if (isEndOfScroll({ scrollHeight, offsetHeight, scrollTop })) {
                    console.log('IsEndOfScroll');
                    const scrollPosition: number = getMaxPrevScrollPosition({
                        type: props.type,
                        scrollTop,
                    });
                    previousScrollTop.current    = scrollPosition;
                    ref.scrollTo({ top: scrollPosition });
                    return;
                }

                console.log('Previous scroll direction:', scrollDirection.current);

                scrollDirection.current = getScrollDirection({
                    previous: previousScrollTop.current,
                    current : scrollTop,
                });

                console.log('Current scroll direction:', scrollDirection.current);

                if (isNextScrollTrigger({
                    scrollDirection  : scrollDirection.current,
                    scrollTop,
                    distanceToTrigger: props.distanceToTrigger,
                })) {
                    console.log('IsNextScrollTrigger', lastHandler.current);
                    if (lastHandler.current !== VirtualScrollDirection.NEXT) {
                        lastHandler.current = VirtualScrollDirection.NEXT;
                        console.log('!!!!! Execute nextHandler');
                        props.nextHandler();
                    }
                } else if (isPreviousScrollTrigger({
                    scrollDirection  : scrollDirection.current,
                    scrollTop,
                    distanceToTrigger: props.distanceToTrigger,
                    offsetHeight,
                    scrollHeight,
                })) {
                    console.log('IsPreviousScrollTrigger', lastHandler.current);
                    if (lastHandler.current !== VirtualScrollDirection.PREVIOUS) {
                        lastHandler.current = VirtualScrollDirection.PREVIOUS;
                        console.log('!!!!! Execute prevHandler');
                        props.prevHandler();
                    }
                } else if (previousScrollTop.current !== Math.abs(scrollTop)) {
                    console.log('IsOtherTrigger');
                    lastHandler.current = VirtualScrollDirection.NONE;
                    console.log('!!!!! Execute otherHandler');
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