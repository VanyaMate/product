import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { VirtualType } from '@/shared/ui-kit/box/Virtual/types/types.ts';


export type UseVirtualScrollProps = {
    animationMs: number;
    scrollDistance: number;
    type: VirtualType;
}

export enum VirtualScrollDirection {
    TOP    = 'top',
    BOTTOM = 'bottom',
    NONE   = 'none'
}

export const useVirtualScroll = function (props: UseVirtualScrollProps) {
    const {
              animationMs,
              type,
              scrollDistance,
          }                    = props;
    const containerRef         = useRef<HTMLDivElement>(null);
    const targetScrollPosition = useRef<number>(0);
    const startTimeRef         = useRef<number>(0);
    const startPositionRef     = useRef<number>(0);

    const previousScrollHeight = useRef<number>(0);

    const scrollAnimation = useCallback((timestamp?: number) => {
        if (startTimeRef.current === 0) {
            startTimeRef.current = timestamp;
        }
        const progress      = timestamp - startTimeRef.current;
        const easeInOutQuad = (t: number) => t < 0.5
                                             ? 2 * t * t
                                             : -1 + (4 - 2 * t) * t;

        const elapsedTime           = Math.min(progress / animationMs, 1);
        const ease                  = easeInOutQuad(elapsedTime);
        const currentScrollPosition = startPositionRef.current + ease * (targetScrollPosition.current - startPositionRef.current);

        containerRef.current.scrollTop = currentScrollPosition;

        if (elapsedTime < 1) {
            requestAnimationFrame(scrollAnimation);
        }
    }, [ animationMs ]);

    const scrollHandler = useCallback((side: VirtualScrollDirection) => {
        const { scrollTop, scrollHeight, offsetHeight } = containerRef.current;

        if (type === VirtualType.TOP) {
            if (side === VirtualScrollDirection.TOP) {
                if (targetScrollPosition.current === 0) {
                    return;
                }
                targetScrollPosition.current = Math.max(0, targetScrollPosition.current + scrollDistance);
            } else {
                if (targetScrollPosition.current === scrollHeight - offsetHeight) {
                    return;
                }
                targetScrollPosition.current = Math.min(scrollHeight - offsetHeight, targetScrollPosition.current - scrollDistance);
            }
        } else {
            if (side === VirtualScrollDirection.TOP) {
                if (targetScrollPosition.current === -(scrollHeight - offsetHeight)) {
                    return;
                }
                targetScrollPosition.current = Math.max(-(scrollHeight - offsetHeight), targetScrollPosition.current - scrollDistance);
            } else {
                if (targetScrollPosition.current === 0) {
                    return;
                }
                targetScrollPosition.current = Math.min(0, targetScrollPosition.current + scrollDistance);
            }
        }

        startPositionRef.current = scrollTop;
        startTimeRef.current     = 0;
        requestAnimationFrame(scrollAnimation);
    }, [ scrollAnimation, scrollDistance, type ]);

    const scrollTo = useCallback((options: ScrollToOptions) => {
        targetScrollPosition.current = options.top;
        startTimeRef.current         = 0;

        if (options.behavior === 'smooth') {
            startPositionRef.current = containerRef.current.scrollTop;
            requestAnimationFrame(scrollAnimation);
        } else {
            containerRef.current.scrollTop = options.top;
        }
    }, [ scrollAnimation ]);

    useEffect(() => {
        const ref = containerRef.current;
        if (ref) {
            previousScrollHeight.current = ref.scrollHeight;

            return () => {
                console.log('[RETURN] RefContainerHeight', ref.scrollHeight);

            };
        }
    });

    useLayoutEffect(() => {
        const ref = containerRef.current;

        if (ref) {
            const onWheelHandler = function (event: WheelEvent) {
                if (event.deltaY > 0) {
                    scrollHandler(VirtualScrollDirection.BOTTOM);
                } else {
                    scrollHandler(VirtualScrollDirection.TOP);
                }
            };

            ref.addEventListener('wheel', onWheelHandler);

            return () => {
                ref.removeEventListener('wheel', onWheelHandler);
            };
        }
    }, [ animationMs, scrollDistance, scrollHandler, type ]);

    return { containerRef, scrollTo };
};