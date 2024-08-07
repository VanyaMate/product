/* eslint-disable */

import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    ReactNode, useCallback,
    useEffect,
    useLayoutEffect, useMemo,
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
     * Variables
     ******************************************************************/

    const toggleDistance = useMemo(() => Math.ceil(showAmount / 4), [ showAmount ]);


    /*******************************************************************
     * Items
     ******************************************************************/

    const { virtualList, setIndex, currentIndex } = useVirtualList({
        type,
        list,
        showAmount,
    });


    /*******************************************************************
     * Wheel scroll, scroll animation, scrollTo
     ******************************************************************/

    const containerRef           = useRef<HTMLDivElement>(null);
    const targetScrollPosition   = useRef<number>(0);
    const startAnimationTime     = useRef<number>(0);
    const startAnimationPosition = useRef<number>(0);
    const requestAnimation       = useRef<number>(0);

    const scrollAnimation = useCallback((ref: HTMLDivElement, timestamp: number) => {
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
            requestAnimation.current = requestAnimationFrame((t) => scrollAnimation(ref, t));
        }
    }, [ animationMs ]);

    const scrollTo = useCallback((target: number, smooth: boolean) => {
        const ref = containerRef.current;
        if (ref) {
            if (smooth) {
                targetScrollPosition.current   = target;
                startAnimationPosition.current = ref.scrollTop;
                startAnimationTime.current     = 0;
                requestAnimation.current       = requestAnimationFrame((t) => scrollAnimation(ref, t));
            } else {
                cancelAnimationFrame(requestAnimation.current);
                ref.scrollTop = target;
            }
        }
    }, []);

    useLayoutEffect(() => {
        const ref = containerRef.current;

        if (ref) {
            const onWheelHandler = function (event: WheelEvent) {
                const { scrollHeight, offsetHeight } = ref;

                const targetPosition = getScrollTargetScrollPosition({
                    scrollDistance,
                    scrollHeight,
                    type,
                    offsetHeight,
                    currentTarget: targetScrollPosition.current,
                    offset       : event.deltaY,
                });

                if (targetPosition !== null) {
                    scrollTo(targetPosition, true);
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

    const saveCurrentFirstElement = useCallback((content: HTMLDivElement) => {
        const firstElement = content.firstElementChild as HTMLElement;

        if (firstElement) {
            previousFirstElementPosition.current = firstElement.offsetTop;
            previousFirstElement.current         = firstElement;
            disableScrollHandler.current         = true;
        }
    }, []);

    const saveCurrentLastElement = useCallback((content: HTMLDivElement) => {
        const lastElement = content.lastElementChild as HTMLElement;

        if (lastElement) {
            previousLastElementPosition.current = lastElement.offsetTop;
            previousLastElement.current         = lastElement;
            disableScrollHandler.current        = true;
        }
    }, []);

    const toggleNext = useCallback((content: HTMLDivElement) => {
        previousScrollAction.current  = VirtualAction.TOGGLE_NEXT;
        previousContentHeight.current = content.scrollHeight;

        if (isTop(type)) {
            saveCurrentFirstElement(content);
            setIndex(Math.max(0, currentIndex.current - toggleDistance));
        } else {
            saveCurrentLastElement(content);
            setIndex(Math.min(Math.max(0, list.length - showAmount), currentIndex.current + toggleDistance));
        }
    }, [ type, setIndex, toggleDistance, saveCurrentFirstElement, saveCurrentLastElement ]);

    const togglePrevious = useCallback((content: HTMLDivElement) => {
        previousScrollAction.current  = VirtualAction.TOGGLE_PREVIOUS;
        previousContentHeight.current = content.scrollHeight;

        if (isTop(type)) {
            saveCurrentLastElement(content);
            setIndex(Math.min(Math.max(0, list.length - showAmount), currentIndex.current + toggleDistance));
        } else {
            saveCurrentFirstElement(content);
            setIndex(Math.max(0, currentIndex.current - toggleDistance));
        }
    }, [ type, setIndex, toggleDistance, saveCurrentFirstElement, saveCurrentLastElement ]);

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
                })) {
                    switch (previousScrollAction.current) {
                        case VirtualAction.AUTOSCROLL_NEXT:
                        case VirtualAction.TOGGLE_NEXT:
                            break;
                        default:
                            let isNotStartList: boolean;

                            if (isTop(type)) {
                                isNotStartList = currentIndex.current !== 0;
                            } else {
                                isNotStartList = currentIndex.current < list.length - showAmount;
                            }

                            if (isNotStartList) {
                                toggleNext(content);
                                break;
                            }

                            const needUploadNext = hasMoreNext && uploadNext;
                            if (needUploadNext) {
                                previousContentHeight.current = content.scrollHeight;
                                previousScrollAction.current  = VirtualAction.TOGGLE_NEXT;

                                if (!loadingNext) {
                                    uploadNext();
                                }
                                break;
                            }

                            previousScrollAction.current = VirtualAction.AUTOSCROLL_NEXT;
                            break;
                    }
                } else if (isPreviousScrollPosition({
                    scrollTop,
                    scrollHeight,
                    offsetHeight,
                    previousScrollTop: previousScrollTop.current,
                    distanceToTrigger,
                    type,
                })) {
                    switch (previousScrollAction.current) {
                        case VirtualAction.AUTOSCROLL_PREVIOUS:
                        case VirtualAction.TOGGLE_PREVIOUS:
                            break;
                        default:
                            let isNotEndList: boolean;

                            if (isTop(type)) {
                                isNotEndList = currentIndex.current < list.length - showAmount;
                            } else {
                                isNotEndList = currentIndex.current !== 0;
                            }

                            if (isNotEndList) {
                                togglePrevious(content);
                                break;
                            }

                            const needUploadPrevious = hasMorePrevious && uploadPrevious;
                            if (needUploadPrevious) {
                                previousContentHeight.current = content.scrollHeight;
                                previousScrollAction.current  = VirtualAction.TOGGLE_PREVIOUS;

                                if (!loadingPrevious) {
                                    uploadPrevious();
                                }
                                break;
                            }

                            previousScrollAction.current = VirtualAction.AUTOSCROLL_PREVIOUS;
                            break;
                    }
                } else if (previousScrollTop.current !== scrollTop) {
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

    const applyOffsetToCurrentScrollPosition = useCallback((ref: HTMLDivElement, offset: number) => {
        ref.scrollTop                  = previousScrollTop.current + offset;
        targetScrollPosition.current   = targetScrollPosition.current + offset;
        startAnimationPosition.current = startAnimationPosition.current + offset;
    }, []);

    const scrollByFirstElement = useCallback((content: HTMLDivElement, ref: HTMLDivElement) => {
        const firstElement    = content.firstElementChild as HTMLElement;
        const previousElement = previousFirstElement.current;

        if (firstElement !== previousElement && previousElement !== null) {
            const currentPosition = previousElement?.offsetTop;
            const positionDelta   = currentPosition - previousFirstElementPosition.current;
            applyOffsetToCurrentScrollPosition(ref, positionDelta);
        }
    }, []);

    const scrollByLastElement = useCallback((content: HTMLDivElement, ref: HTMLDivElement) => {
        const lastElement     = content.lastElementChild as HTMLElement;
        const previousElement = previousLastElement.current;

        if (lastElement !== previousElement && previousElement !== null) {
            const currentPosition = previousElement?.offsetTop;
            const positionDelta   = currentPosition - previousLastElementPosition.current;
            applyOffsetToCurrentScrollPosition(ref, positionDelta);
        }
    }, []);

    const updatePreviousFirstElement = useCallback(() => {
        const content = contentRef.current;
        if (content) {
            const firstElement = content.firstElementChild as HTMLElement;
            if (firstElement) {
                previousFirstElement.current         = firstElement;
                previousFirstElementPosition.current = firstElement.offsetTop;
            }
        }
    }, []);

    const updatePreviousLastElement = useCallback(() => {
        const content = contentRef.current;
        if (content) {
            const lastElement = content.lastElementChild as HTMLElement;
            if (lastElement) {
                previousLastElement.current         = lastElement;
                previousLastElementPosition.current = lastElement.offsetTop;
            }
        }
    }, []);

    useEffect(() => {
        const ref     = containerRef.current;
        const content = contentRef.current;

        if (ref && content) {
            switch (previousScrollAction.current) {
                case VirtualAction.TOGGLE_NEXT:
                    if (isTop(type)) {
                        scrollByFirstElement(content, ref);
                    } else {
                        scrollByLastElement(content, ref);
                    }
                    disableScrollHandler.current = false;
                    break;
                case VirtualAction.TOGGLE_PREVIOUS:
                    if (isTop(type)) {
                        scrollByLastElement(content, ref);
                    } else {
                        scrollByFirstElement(content, ref);
                    }
                    disableScrollHandler.current = false;
                    break;
                case VirtualAction.AUTOSCROLL_NEXT:
                    if (isTop(type)) {
                        scrollByFirstElement(content, ref);
                        setTimeout(() => {
                            scrollTo(0, smoothAutoscroll);
                            disableScrollHandler.current = false;
                        });
                    } else {
                        scrollByLastElement(content, ref);
                        setTimeout(() => {
                            scrollTo(0, smoothAutoscroll);
                            disableScrollHandler.current = false;
                        });
                    }
                    break;
                case VirtualAction.AUTOSCROLL_PREVIOUS:
                    if (isTop(type)) {
                        scrollByLastElement(content, ref);
                        setTimeout(() => {
                            scrollTo(ref.scrollHeight - ref.offsetHeight, smoothAutoscroll);
                            disableScrollHandler.current = false;
                        });
                    } else {
                        setTimeout(() => {
                            scrollTo(-(ref.scrollHeight - ref.offsetHeight), smoothAutoscroll);
                            disableScrollHandler.current = false;
                        });
                    }
                    break;
                default:
                    disableScrollHandler.current = false;
                    break;

            }

            updatePreviousFirstElement();
            updatePreviousLastElement();
        }
    }, [ virtualList ]);


    /*******************************************************************
     * Scroll-bar
     ******************************************************************/

    const scrollBarRef                  = useRef<HTMLDivElement>(null);
    const scrollMarkerRef               = useRef<HTMLDivElement>(null);
    const [ scrollable, setScrollable ] = useState<boolean>(false);

    useLayoutEffect(() => {
        const ref    = containerRef.current;
        const bar    = scrollBarRef.current;
        const marker = scrollMarkerRef.current;

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
            };

            ref.addEventListener('scroll', onScrollHandler);
            return () => {
                ref.removeEventListener('scroll', onScrollHandler);
            };
        }
    }, []);

    useLayoutEffect(() => {
        const ref = containerRef.current;

        if (ref) {
            if (ref.scrollHeight === ref.offsetHeight && scrollable === true) {
                setScrollable(false);
            } else if (ref.scrollHeight !== ref.offsetHeight && scrollable === false) {
                setScrollable(true);
            }
        }
    }, [ list ]);


    /*******************************************************************
     * On main list change
     ******************************************************************/

    const previousListLength    = useRef<number>(list.length);
    const previousFirstListItem = useRef<unknown>(list[0]);
    const previousLastListItem  = useRef<unknown>(list.slice(-1)[0]);

    useLayoutEffect(() => {
        const content = contentRef.current;

        if (content) {
            const lengthDelta: number = list.length - previousListLength.current;
            const justRefresh         = lengthDelta <= 0;

            if (justRefresh) {
                setIndex(currentIndex.current);
            }

            const firstItem = list[0];
            const lastItem  = list.slice(-1)[0];

            switch (previousScrollAction.current) {
                case VirtualAction.AUTOSCROLL_NEXT:
                    if (isTop(type)) {
                        disableScrollHandler.current = true;
                        setIndex(0);
                    } else {
                        disableScrollHandler.current = true;
                        setIndex(Math.max(0, list.length - showAmount));
                    }
                    break;
                case VirtualAction.AUTOSCROLL_PREVIOUS:
                    break;
                case VirtualAction.TOGGLE_PREVIOUS:
                    if (isTop(type)) {
                        if (lastItem !== previousLastListItem.current) {
                            disableScrollHandler.current = true;
                            setIndex(Math.max(list.length - showAmount, currentIndex.current + toggleDistance));
                        }
                    } else {
                        if (firstItem !== previousFirstListItem.current) {
                            disableScrollHandler.current = true;
                            setIndex(Math.min(Math.max(0, list.length - showAmount), currentIndex.current + lengthDelta - toggleDistance));
                        }
                    }
                    break;
                case VirtualAction.TOGGLE_NEXT:
                    if (isTop(type)) {
                        if (firstItem !== previousFirstListItem.current) {
                            disableScrollHandler.current = true;
                            setIndex(Math.max(list.length - showAmount, currentIndex.current + toggleDistance));
                        }
                    } else {
                        if (lastItem !== previousLastListItem.current) {
                            disableScrollHandler.current = true;
                            setIndex(Math.min(Math.max(0, list.length - showAmount), currentIndex.current + lengthDelta - toggleDistance));
                        }
                    }
                    break;
                default:
                    break;
            }

            previousListLength.current    = list.length;
            previousLastListItem.current  = lastItem;
            previousFirstListItem.current = firstItem;
        }
    }, [ list, toggleDistance ]);

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
                { !hasMoreNext ? noMoreNextElement : null }
                <div
                    ref={ contentRef }
                    className={ classNames(css.content, {}, [ contentClassName ]) }
                >
                    { virtualList.map(render) }
                </div>
                { !hasMorePrevious ? noMorePreviousElement : null }
            </div>
            <div className={ css.scrollBar } ref={ scrollBarRef }>
                <div className={ css.marker } ref={ scrollMarkerRef }/>
            </div>
        </div>
    );
});