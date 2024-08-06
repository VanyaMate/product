/* eslint-disable */

import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    ReactNode,
    useEffect,
    useLayoutEffect,
    useRef,
} from 'react';
import classNames from 'classnames';
import css from './Virtual.module.scss';
import { isTop } from '@/shared/ui-kit/box/Virtual/lib/isTop/isTop.ts';
import {
    useVirtualList,
} from '@/shared/ui-kit/box/Virtual/hooks/useVirtualList/useVirtualList.ts';
import {
    VirtualAction,
    VirtualList,
    VirtualRenderMethod,
    VirtualType,
    VirtualUploadMethod,
} from '@/shared/ui-kit/box/Virtual/types/types.ts';
import {
    getScrollTargetScrollPosition,
} from '@/shared/ui-kit/box/Virtual/lib/getScrollTargetScrollPosition/getScrollTargetScrollPosition.ts';
import {
    calculateAnimationScrollPosition,
} from '@/shared/ui-kit/box/Virtual/lib/calculateAnimationScrollPosition.ts';
import {
    isNextScrollPosition,
} from '@/shared/ui-kit/box/Virtual/lib/isNextScrollPosition/isNextScrollPosition.ts';
import {
    isPreviousScrollPosition,
} from '@/shared/ui-kit/box/Virtual/lib/isPreviousScrollPosition/isPreviousScrollPosition.ts';


export type VirtualProps =
    {
        list: VirtualList;
        render: VirtualRenderMethod;
        type?: VirtualType;
        smoothAutoscroll?: boolean;
        animationMs?: number;
        scrollDistance?: number;
        showAmount?: number;
        distanceToTrigger?: number;
        autoscrollNext?: boolean;
        autoscrollPrevious?: boolean;
        loadingNext?: boolean;
        loadingPrevious?: boolean;
        uploadNext?: VirtualUploadMethod;
        uploadPrevious?: VirtualUploadMethod;
        hasMoreNext?: boolean;
        hasMorePrevious?: boolean;
        loaderNextElement?: ReactNode;
        loaderPreviousElement?: ReactNode;
        noMoreNextElement?: ReactNode;
        noMorePreviousElement?: ReactNode;
        contentClassName?: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const Virtual: FC<VirtualProps> = memo(function Virtual (props) {
    const {
              className,
              contentClassName,
              list,
              render,
              type               = VirtualType.TOP,
              smoothAutoscroll   = true,
              animationMs        = 100,
              scrollDistance     = 100,
              showAmount         = 20,
              distanceToTrigger  = 100,
              autoscrollNext     = true,
              autoscrollPrevious = false,
              loadingNext        = false,
              loadingPrevious    = false,
              uploadNext,
              uploadPrevious,
              hasMoreNext        = false,
              hasMorePrevious    = false,
              loaderNextElement,
              loaderPreviousElement,
              noMoreNextElement,
              noMorePreviousElement,
              ...other
          } = props;

    /*******************************************************************
     * Items
     ******************************************************************/

    const { virtualList, setIndex, currentIndex } = useVirtualList({
        type,
        list,
        showAmount,
    });


    /*******************************************************************
     * Scroll
     ******************************************************************/

    const containerRef           = useRef<HTMLDivElement>(null);
    const targetScrollPosition   = useRef<number>(0);
    const startAnimationTime     = useRef<number>(0);
    const startAnimationPosition = useRef<number>(0);

    useLayoutEffect(() => {
        const ref = containerRef.current;

        if (ref) {
            const scrollAnimation = function (timestamp: number) {
                if (startAnimationTime.current === 0) {
                    startAnimationTime.current = timestamp;
                }

                const scrollPosition = calculateAnimationScrollPosition({
                    animationMs,
                    timestamp,
                    startAnimationPosition: startAnimationPosition.current,
                    targetScrollPosition  : targetScrollPosition.current,
                    startAnimationTime    : startAnimationTime.current,
                });

                ref.scrollTop = scrollPosition;

                if (scrollPosition !== targetScrollPosition.current) {
                    requestAnimationFrame(scrollAnimation);
                }
            };

            const onWheelHandler = function (event: WheelEvent) {
                const { scrollTop, scrollHeight, offsetHeight } = ref;

                const targetPosition = getScrollTargetScrollPosition({
                    scrollDistance,
                    scrollHeight,
                    type,
                    offsetHeight,
                    currentTarget: targetScrollPosition.current,
                    offset       : event.deltaY,
                });


                if (targetPosition !== null) {
                    targetScrollPosition.current   = targetPosition;
                    startAnimationPosition.current = scrollTop;
                    startAnimationTime.current     = 0;
                    requestAnimationFrame(scrollAnimation);
                }
            };

            ref.addEventListener('wheel', onWheelHandler);
            return () => {
                ref.removeEventListener('wheel', onWheelHandler);
            };
        }
    }, []);


    /*******************************************************************
     * Toggle list by scroll position
     ******************************************************************/

    const previousScrollTop    = useRef<number>(0);
    const previousScrollAction = useRef<VirtualAction>(VirtualAction.AUTOSCROLL_NEXT);
    const disableScrollHandler = useRef<boolean>(false);

    useLayoutEffect(() => {
        const ref     = containerRef.current;
        const content = contentRef.current;

        if (ref && content) {
            const onScrollHandler = function () {
                const { scrollTop, scrollHeight, offsetHeight } = ref;

                if (disableScrollHandler.current) {
                    return;
                }

                if (isNextScrollPosition({
                    scrollTop,
                    previousScrollTop: previousScrollTop.current,
                    distanceToTrigger,
                    type,
                }) && previousScrollAction.current !== VirtualAction.TOGGLE_NEXT) {
                    previousScrollAction.current  = VirtualAction.TOGGLE_NEXT;
                    previousContentHeight.current = content.scrollHeight;
                    if (isTop(type)) {
                        const firstElement                   = content.firstElementChild as HTMLElement;
                        previousFirstElementPosition.current = firstElement.offsetTop;
                        previousFirstElement.current         = firstElement;
                        disableScrollHandler.current         = true;
                        setIndex(Math.max(0, currentIndex.current - 10));
                    } else {
                        const lastElement                   = content.lastElementChild as HTMLElement;
                        previousLastElementPosition.current = lastElement.offsetTop;
                        previousLastElement.current         = lastElement;
                        disableScrollHandler.current        = true;
                        setIndex(Math.min(Math.max(0, list.length - showAmount), currentIndex.current + 10));
                    }
                } else if (isPreviousScrollPosition({
                    scrollTop,
                    scrollHeight,
                    offsetHeight,
                    previousScrollTop: previousScrollTop.current,
                    distanceToTrigger,
                    type,
                }) && previousScrollAction.current !== VirtualAction.TOGGLE_PREVIOUS) {
                    previousScrollAction.current  = VirtualAction.TOGGLE_PREVIOUS;
                    previousContentHeight.current = content.scrollHeight;
                    if (isTop(type)) {
                        const lastElement                   = content.lastElementChild as HTMLElement;
                        previousLastElementPosition.current = lastElement.offsetTop;
                        previousLastElement.current         = lastElement;
                        disableScrollHandler.current        = true;
                        setIndex(Math.min(Math.max(0, list.length - showAmount), currentIndex.current + 10));
                    } else {
                        const firstElement                   = content.firstElementChild as HTMLElement;
                        previousFirstElementPosition.current = firstElement.offsetTop;
                        previousFirstElement.current         = firstElement;
                        disableScrollHandler.current         = true;
                        setIndex(Math.max(0, currentIndex.current - 10));
                    }
                } else {
                    previousScrollAction.current = VirtualAction.NONE;
                }

                previousScrollTop.current = scrollTop;
            };

            ref.addEventListener('scroll', onScrollHandler);
            return () => {
                ref.removeEventListener('scroll', onScrollHandler);
            };
        }
    }, [ setIndex, list ]);


    /*******************************************************************
     * Scroll after update virtual list
     ******************************************************************/

    const contentRef                   = useRef<HTMLDivElement>(null);
    const previousFirstElement         = useRef<HTMLElement>(null);
    const previousFirstElementPosition = useRef<number>(0);
    const previousLastElement          = useRef<HTMLElement>(null);
    const previousLastElementPosition  = useRef<number>(0);
    const previousContentHeight        = useRef<number>(null);

    useEffect(() => {
        const ref     = containerRef.current;
        const content = contentRef.current;

        if (ref && content) {
            switch (previousScrollAction.current) {
                case VirtualAction.TOGGLE_NEXT:
                    if (isTop(type)) {
                        const firstElement    = content.firstElementChild as HTMLElement;
                        const previousElement = previousFirstElement.current;

                        if (firstElement !== previousElement) {
                            const currentPosition          = previousElement.offsetTop;
                            const positionDelta            = currentPosition - previousFirstElementPosition.current;
                            const heightDelta              = content.scrollHeight - previousContentHeight.current;
                            ref.scrollTop                  = previousScrollTop.current + positionDelta - heightDelta;
                            targetScrollPosition.current   = targetScrollPosition.current + positionDelta;
                            startAnimationPosition.current = startAnimationPosition.current + positionDelta;
                        }
                    } else {
                        const lastElement     = content.lastElementChild as HTMLElement;
                        const previousElement = previousLastElement.current;

                        if (lastElement !== previousElement) {
                            const currentPosition          = previousElement.offsetTop;
                            const positionDelta            = currentPosition - previousLastElementPosition.current;
                            ref.scrollTop                  = previousScrollTop.current + positionDelta;
                            targetScrollPosition.current   = targetScrollPosition.current + positionDelta;
                            startAnimationPosition.current = startAnimationPosition.current + positionDelta;
                        }
                    }
                    disableScrollHandler.current   = false;
                    break;
                case VirtualAction.TOGGLE_PREVIOUS:
                    if (isTop(type)) {
                        const lastElement     = content.lastElementChild as HTMLElement;
                        const previousElement = previousLastElement.current;

                        if (lastElement !== previousElement) {
                            const currentPosition          = previousElement.offsetTop;
                            const positionDelta            = currentPosition - previousLastElementPosition.current;
                            const heightDelta              = content.scrollHeight - previousContentHeight.current;
                            ref.scrollTop                  = previousScrollTop.current + positionDelta - heightDelta;
                            targetScrollPosition.current   = targetScrollPosition.current + positionDelta;
                            startAnimationPosition.current = startAnimationPosition.current + positionDelta;
                        }
                    } else {
                        const firstElement    = content.firstElementChild as HTMLElement;
                        const previousElement = previousFirstElement.current;

                        if (firstElement !== previousElement) {
                            const currentPosition          = previousElement.offsetTop;
                            const positionDelta            = currentPosition - previousFirstElementPosition.current;
                            ref.scrollTop                  = previousScrollTop.current + positionDelta;
                            targetScrollPosition.current   = targetScrollPosition.current + positionDelta;
                            startAnimationPosition.current = startAnimationPosition.current + positionDelta;
                        }
                    }
                    disableScrollHandler.current   = false;
                    break;
                case VirtualAction.AUTOSCROLL_NEXT:
                    break;
                case VirtualAction.AUTOSCROLL_PREVIOUS:
                    break;
                default:
                    disableScrollHandler.current = false;
                    break;

            }
        }
    }, [ virtualList ]);

    return (
        <div
            { ...other }
            className={ classNames(css.container, { [css.top]: isTop(type) }, [ className ]) }
            ref={ containerRef }
        >
            <div
                ref={ contentRef }
                className={ classNames(css.content, {}, [ contentClassName ]) }
            >
                { virtualList.map(render) }
            </div>
        </div>
    );
});