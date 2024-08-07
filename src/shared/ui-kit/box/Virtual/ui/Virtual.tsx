/* eslint-disable */

import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    ReactNode, useCallback,
    useEffect,
    useLayoutEffect,
    useRef, useState,
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

    const scrollAnimation = useCallback((timestamp: number) => {
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

        containerRef.current.scrollTop = scrollPosition;

        if (scrollPosition !== targetScrollPosition.current) {
            requestAnimationFrame(scrollAnimation);
        }
    }, []);

    useLayoutEffect(() => {
        const ref = containerRef.current;

        if (ref) {
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
                }) && previousScrollAction.current === VirtualAction.NONE) {
                    if (isTop(type)) {
                        if (currentIndex.current !== 0) {
                            previousScrollAction.current         = VirtualAction.TOGGLE_NEXT;
                            previousContentHeight.current        = content.scrollHeight;
                            const firstElement                   = content.firstElementChild as HTMLElement;
                            previousFirstElementPosition.current = firstElement.offsetTop;
                            previousFirstElement.current         = firstElement;
                            disableScrollHandler.current         = true;
                            setIndex(Math.max(0, currentIndex.current - 10));
                        } else if (uploadNext && hasMoreNext) {
                            if (!loadingNext) {
                                previousContentHeight.current = content.scrollHeight;
                                previousScrollAction.current  = VirtualAction.TOGGLE_NEXT;
                                uploadNext();
                            }
                        } else {
                            previousContentHeight.current = content.scrollHeight;
                            previousScrollAction.current  = VirtualAction.AUTOSCROLL_NEXT;
                        }
                    } else {
                        if (currentIndex.current < list.length - showAmount) {
                            previousScrollAction.current        = VirtualAction.TOGGLE_NEXT;
                            previousContentHeight.current       = content.scrollHeight;
                            const lastElement                   = content.lastElementChild as HTMLElement;
                            previousLastElementPosition.current = lastElement.offsetTop;
                            previousLastElement.current         = lastElement;
                            disableScrollHandler.current        = true;
                            setIndex(Math.min(Math.max(0, list.length - showAmount), currentIndex.current + 10));
                        } else if (uploadNext && hasMoreNext) {
                            if (!loadingNext) {
                                previousContentHeight.current = content.scrollHeight;
                                previousScrollAction.current  = VirtualAction.TOGGLE_NEXT;
                                uploadNext();
                            }
                        } else {
                            console.log('SET AUTOSCROLL NEXT', content);
                            previousContentHeight.current = content.scrollHeight;
                            previousScrollAction.current  = VirtualAction.AUTOSCROLL_NEXT;
                        }
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
                } else if (previousScrollTop.current !== scrollTop) {
                    console.log('SET AUTOSCROLL NONE');
                    previousScrollAction.current = VirtualAction.NONE;
                }

                previousScrollTop.current = scrollTop;
            };

            onScrollHandler();

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
                            ref.scrollTop                  = previousScrollTop.current + positionDelta;
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
                    disableScrollHandler.current = false;
                    break;
                case VirtualAction.TOGGLE_PREVIOUS:
                    if (isTop(type)) {
                        const lastElement     = content.lastElementChild as HTMLElement;
                        const previousElement = previousLastElement.current;

                        if (lastElement !== previousElement && previousElement !== null) {
                            const currentPosition          = previousElement.offsetTop;
                            const positionDelta            = currentPosition - previousLastElementPosition.current;
                            ref.scrollTop                  = previousScrollTop.current + positionDelta;
                            targetScrollPosition.current   = targetScrollPosition.current + positionDelta;
                            startAnimationPosition.current = startAnimationPosition.current + positionDelta;
                        }
                    } else {
                        const firstElement    = content.firstElementChild as HTMLElement;
                        const previousElement = previousFirstElement.current;

                        if (firstElement !== previousElement && previousElement !== null) {
                            const currentPosition          = previousElement.offsetTop;
                            const positionDelta            = currentPosition - previousFirstElementPosition.current;
                            ref.scrollTop                  = previousScrollTop.current + positionDelta;
                            targetScrollPosition.current   = targetScrollPosition.current + positionDelta;
                            startAnimationPosition.current = startAnimationPosition.current + positionDelta;
                        }
                    }
                    disableScrollHandler.current = false;
                    break;
                case VirtualAction.AUTOSCROLL_NEXT:
                    console.log('AUTOSCROLL NEXT');
                    if (isTop(type)) {
                        const firstElement    = content.firstElementChild as HTMLElement;
                        const previousElement = previousFirstElement.current;

                        if (firstElement !== previousElement && previousElement !== null) {
                            const currentPosition = previousElement.offsetTop;
                            const positionDelta   = currentPosition - previousFirstElementPosition.current;
                            ref.scrollTop         = previousScrollTop.current + positionDelta;
                        }
                    } else {
                        const lastElement     = content.lastElementChild as HTMLElement;
                        const previousElement = previousLastElement.current;

                        console.log('Last element', lastElement);
                        console.log('PreviousElement', previousElement);

                        if (lastElement !== previousElement && previousElement !== null) {
                            const currentPosition = previousElement.offsetTop;
                            const positionDelta   = currentPosition - previousLastElementPosition.current;
                            ref.scrollTop         = previousScrollTop.current + positionDelta;
                            console.log('scroll top ->', ref.scrollTop);
                            setTimeout(() => {
                                console.log('scroll');
                                targetScrollPosition.current   = 0;
                                startAnimationPosition.current = ref.scrollTop;
                                startAnimationTime.current     = 0;
                                requestAnimationFrame(scrollAnimation);
                            });
                        }
                    }
                    disableScrollHandler.current = false;
                    break;
                case VirtualAction.AUTOSCROLL_PREVIOUS:
                    break;
                default:
                    disableScrollHandler.current = false;
                    break;

            }
        }
    }, [ virtualList ]);


    /*******************************************************************
     * Scroll-bar
     ******************************************************************/

    const scrollBarRef                  = useRef<HTMLDivElement>(null);
    const scrollMarketRef               = useRef<HTMLDivElement>(null);
    const [ scrollable, setScrollable ] = useState<boolean>(false);

    useLayoutEffect(() => {
        const ref    = containerRef.current;
        const bar    = scrollBarRef.current;
        const marker = scrollMarketRef.current;

        if (ref && bar && marker) {
            if (ref.scrollHeight === ref.offsetHeight && scrollable === true) {
                setScrollable(false);
            } else if (ref.scrollHeight !== ref.offsetHeight && scrollable === false) {
                setScrollable(true);
            }

            const onScrollHandler = function () {
                const { scrollTop, scrollHeight, offsetHeight } = ref;
                const barHeight                                 = bar.offsetHeight;
                const markerHeight                              = marker.offsetHeight;

                const percentOfScroll = 100 / (scrollHeight - offsetHeight) * scrollTop;
                const markerOffset    = (barHeight - markerHeight) / 100 * percentOfScroll;

                marker.style.transform = `translateY(${ markerOffset }px)`;
                // get position of marker
                // set position to marker
            };

            ref.addEventListener('scroll', onScrollHandler);
            return () => {
                ref.removeEventListener('scroll', onScrollHandler);
            };
        }
    }, []);


    /*******************************************************************
     * On main list change
     ******************************************************************/

    const previousListLength    = useRef<number>(list.length);
    const previousFirstListItem = useRef<unknown>(list[0]);
    const previousLastListItem  = useRef<unknown>(list.slice(-1)[0]);

    useLayoutEffect(() => {
        const content = contentRef.current;

        if (content) {
            const listLengthChanged = previousListLength.current !== list.length;

            console.log('UPDATOR:', previousScrollAction.current, list);

            if (!listLengthChanged) {
                // Just refresh
                setIndex(currentIndex.current);
            }

            const firstItem = list[0];
            const lastItem  = list.slice(-1)[0];

            switch (previousScrollAction.current) {
                case VirtualAction.AUTOSCROLL_NEXT:
                    if (isTop(type)) {
                        console.log('firs titem', firstItem);
                        if (firstItem !== previousFirstListItem.current) {
                            const firstElement                   = content.firstElementChild as HTMLElement;
                            previousFirstElementPosition.current = firstElement.offsetTop;
                            previousFirstElement.current         = firstElement;
                            disableScrollHandler.current         = true;
                            setIndex(0);
                        }
                    } else {
                        console.log('last item', lastItem);
                        if (lastItem !== previousLastListItem.current) {
                            const lastElement                   = content.lastElementChild as HTMLElement;
                            previousLastElementPosition.current = lastElement.offsetTop;
                            previousLastElement.current         = lastElement;
                            disableScrollHandler.current        = true;
                            setIndex(Math.max(0, list.length - showAmount));
                        }
                    }
                    break;
                case VirtualAction.AUTOSCROLL_PREVIOUS:
                    break;
                default:
                    break;
            }

            previousLastListItem.current  = lastItem;
            previousFirstListItem.current = firstItem;
        }
    }, [ list ]);


    return (
        <div
            className={ classNames(css.container, {
                [css.top]       : isTop(type),
                [css.scrollable]: scrollable,
            }, [ className ]) }>
            <div
                { ...other }
                className={ css.scrollContainer }
                ref={ containerRef }
            >
                <div
                    ref={ contentRef }
                    className={ classNames(css.content, {}, [ contentClassName ]) }
                >
                    { virtualList.map(render) }
                </div>
            </div>
            <div className={ css.scrollBar } ref={ scrollBarRef }>
                <div className={ css.marker } ref={ scrollMarketRef }/>
            </div>
        </div>
    );
});