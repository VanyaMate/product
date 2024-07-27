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
    isTop,
} from '@/shared/ui-kit/box/InfinityVirtual_2/lib/isTop/isTop.ts';


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
    const containerRef      = useRef<HTMLDivElement>(null);
    const previousScrollTop = useRef<number>(0);
    const scrollDirection   = useRef<VirtualScrollDirection>(VirtualScrollDirection.PREVIOUS);
    const lastHandler       = useRef<VirtualScrollDirection>(VirtualScrollDirection.NEXT);
    const previous          = useVirtualPreviousItems(props.virtualItems);

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
                        top     : isTop(props.type) ? 1 : -1,
                        behavior: props.smoothScroll ? 'smooth' : 'instant',
                    });
                }
                break;
            case VirtualAction.TOGGLE_NEXT:
                if (isNextChanges({
                    type         : props.type,
                    previousLast : previous.last.current,
                    previousFirst: previous.first.current,
                    items        : props.virtualItems,
                })) {
                    containerRef.current.scrollTo({
                        top: isTop(props.type) ? 1 : -1,
                    });
                }
                break;
            case VirtualAction.TOGGLE_PREVIOUS:
                if (isNextChanges({
                    type         : props.type,
                    previousLast : previous.last.current,
                    previousFirst: previous.first.current,
                    items        : props.virtualItems,
                })) {
                    containerRef.current.scrollTo({
                        top: isTop(props.type)
                             ? containerRef.current.scrollTop + 1
                             : containerRef.current.scrollTop - 1,
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
            previousScrollTop.current = Math.abs(ref.scrollTop);

            const onScrollHandler = function () {
                const { scrollTop, scrollHeight, offsetHeight } = ref;

                if (Math.abs(ref.scrollTop) === 0) {
                    ref.scrollTo({
                        top: isTop(props.type) ? 1 : -1,
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
                } else {
                    lastHandler.current = VirtualScrollDirection.NONE;
                    props.otherHandler();
                }

                previousScrollTop.current = Math.abs(scrollTop);
            };

            onScrollHandler();

            ref.addEventListener('scroll', onScrollHandler);
            return () => ref.removeEventListener('scroll', onScrollHandler);
        }
    }, [ props ]);

    return { ref: containerRef };
};