import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    ReactNode,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import classNames from 'classnames';
import css from './Virtual.module.scss';
import { isTop } from '@/shared/ui-kit/box/Virtual/lib/isTop/isTop.ts';
import {
    useVirtualList,
} from '@/shared/ui-kit/box/Virtual/hooks/useVirtualList/useVirtualList.ts';
import {
    VirtualAction,
    VirtualElement,
    VirtualIndexSetter,
    VirtualList,
    VirtualRenderMethod,
    VirtualScrollTo,
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
        permanentNextElement?: VirtualElement;
        permanentPreviousElement?: VirtualElement;
        additionalElements?: Array<VirtualElement>;
        contentClassName?: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const Virtual: FC<VirtualProps> = memo(function Virtual (props) {
    const {
              className,
              contentClassName,
              list,
              render,
              type                     = VirtualType.TOP,
              smoothAutoscroll         = true,
              animationMs              = 100,
              scrollDistance           = 100,
              showAmount               = 20,
              distanceToTrigger        = 100,
              autoscrollNext           = true,
              autoscrollPrevious       = false,
              loadingNext              = false,
              loadingPrevious          = false,
              uploadNext               = null,
              uploadPrevious           = null,
              hasMoreNext              = false,
              hasMorePrevious          = false,
              loaderNextElement        = null,
              loaderPreviousElement    = null,
              permanentNextElement     = null,
              permanentPreviousElement = null,
              noMoreNextElement        = null,
              noMorePreviousElement    = null,
              additionalElements       = [],
              ...other
          } = props;

    /*******************************************************************
     * Variables
     ******************************************************************/

    const toggleDistance = Math.ceil(showAmount / 4);


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

    const containerRef            = useRef<HTMLDivElement>(null);
    const targetScrollPosition    = useRef<number>(0);
    const startAnimationTime      = useRef<number>(0);
    const startAnimationPosition  = useRef<number>(0);
    const requestAnimation        = useRef<number>(0);
    const manualScrollTopPosition = useRef<number>();

    const scrollAnimation = useCallback((ref: HTMLDivElement, timestamp: number, animationMs: number) => {
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

        ref.scrollTop = manualScrollTopPosition.current = scrollPosition;

        if (scrollPosition !== targetScrollPosition.current) {
            requestAnimation.current = requestAnimationFrame((t) => scrollAnimation(ref, t, animationMs));
        }
    }, []);

    const scrollTo = useCallback<VirtualScrollTo>((target: number, smooth: boolean, animationMs: number) => {
        const ref = containerRef.current;
        if (ref) {
            if (smooth) {
                targetScrollPosition.current   = target;
                startAnimationPosition.current = ref.scrollTop;
                startAnimationTime.current     = 0;
                requestAnimation.current       = requestAnimationFrame((t) => scrollAnimation(ref, t, animationMs));
            } else {
                targetScrollPosition.current = target;
                cancelAnimationFrame(requestAnimation.current);
                ref.scrollTop = manualScrollTopPosition.current = target;
            }
        }
    }, [ scrollAnimation ]);

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
                    scrollTo(targetPosition, true, animationMs);
                }
            };

            ref.addEventListener('wheel', onWheelHandler);
            return () => {
                ref.removeEventListener('wheel', onWheelHandler);
            };
        }
    }, [ animationMs, scrollDistance, scrollTo, type ]);


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

    const toggleNext = useCallback((content: HTMLDivElement, setIndex: VirtualIndexSetter, list: VirtualList, type: VirtualType, showAmount: number, toggleDistance: number) => {
        previousScrollAction.current  = VirtualAction.TOGGLE_NEXT;
        previousContentHeight.current = content.scrollHeight;

        if (isTop(type)) {
            saveCurrentFirstElement(content);
            setIndex(Math.max(0, currentIndex.current - toggleDistance), list, showAmount);
        } else {
            saveCurrentLastElement(content);
            setIndex(Math.min(Math.max(0, list.length - showAmount), currentIndex.current + toggleDistance), list, showAmount);
        }
        // eslint-disable-next-line
    }, []);

    const togglePrevious = useCallback((content: HTMLDivElement, setIndex: VirtualIndexSetter, list: VirtualList, type: VirtualType, showAmount: number, toggleDistance: number) => {
        previousScrollAction.current  = VirtualAction.TOGGLE_PREVIOUS;
        previousContentHeight.current = content.scrollHeight;

        if (isTop(type)) {
            saveCurrentLastElement(content);
            setIndex(Math.min(Math.max(0, list.length - showAmount), currentIndex.current + toggleDistance), list, showAmount);
        } else {
            saveCurrentFirstElement(content);
            setIndex(Math.max(0, currentIndex.current - toggleDistance), list, showAmount);
        }
        // eslint-disable-next-line
    }, []);

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
                    let isNotStartList: boolean;

                    switch (previousScrollAction.current) {
                        case VirtualAction.TOGGLE_NEXT:
                            break;
                        default:
                            if (isTop(type)) {
                                isNotStartList = currentIndex.current !== 0;
                            } else {
                                isNotStartList = currentIndex.current < list.length - showAmount;
                            }

                            if (isNotStartList) {
                                toggleNext(content, setIndex, list, type, showAmount, toggleDistance);
                                break;
                            }

                            if (hasMoreNext && uploadNext) {
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
                    let isNotEndList: boolean;

                    switch (previousScrollAction.current) {
                        case VirtualAction.TOGGLE_PREVIOUS:
                            break;
                        default:
                            if (isTop(type)) {
                                isNotEndList = currentIndex.current < list.length - showAmount;
                            } else {
                                isNotEndList = currentIndex.current !== 0;
                            }

                            if (isNotEndList) {
                                togglePrevious(content, setIndex, list, type, showAmount, toggleDistance);
                                break;

                            }

                            if (hasMorePrevious && uploadPrevious) {
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
        // eslint-disable-next-line
    }, [ distanceToTrigger, hasMoreNext, hasMorePrevious, list, loadingNext, loadingPrevious, showAmount, type, uploadNext, uploadPrevious ]);


    /*******************************************************************
     * Scroll after update virtual list
     ******************************************************************/

    const contentRef                   = useRef<HTMLDivElement>(null);
    const previousFirstElement         = useRef<HTMLElement>(null);
    const previousFirstElementPosition = useRef<number>(0);
    const previousLastElement          = useRef<HTMLElement>(null);
    const previousLastElementPosition  = useRef<number>(0);
    const previousContentHeight        = useRef<number>(null);
    const userScroll                   = useRef<boolean>(true);

    const applyOffsetToCurrentScrollPosition = useCallback((ref: HTMLDivElement, offset: number) => {
        ref.scrollTop                  = manualScrollTopPosition.current += offset;
        targetScrollPosition.current   = targetScrollPosition.current + offset;
        startAnimationPosition.current = startAnimationPosition.current + offset;
    }, []);

    const scrollByFirstElement = useCallback((content: HTMLDivElement, ref: HTMLDivElement) => {
        const firstElement    = content.firstElementChild as HTMLElement;
        const previousElement = previousFirstElement.current;

        if (firstElement !== previousElement && previousElement !== null && previousElement.parentNode) {
            const currentPosition = previousElement.offsetTop;
            const positionDelta   = currentPosition - previousFirstElementPosition.current;
            applyOffsetToCurrentScrollPosition(ref, positionDelta);
        }
        // eslint-disable-next-line
    }, []);

    const scrollByLastElement = useCallback((content: HTMLDivElement, ref: HTMLDivElement) => {
        const lastElement     = content.lastElementChild as HTMLElement;
        const previousElement = previousLastElement.current;

        if (lastElement !== previousElement && previousElement !== null && previousElement.parentNode) {
            const currentPosition = previousElement.offsetTop;
            const positionDelta   = currentPosition - previousLastElementPosition.current;
            applyOffsetToCurrentScrollPosition(ref, positionDelta);
        }
        // eslint-disable-next-line
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
                    previousScrollAction.current = VirtualAction.NONE;
                    disableScrollHandler.current = false;
                    break;
                case VirtualAction.TOGGLE_PREVIOUS:
                    if (isTop(type)) {
                        scrollByLastElement(content, ref);
                    } else {
                        scrollByFirstElement(content, ref);
                    }
                    previousScrollAction.current = VirtualAction.NONE;
                    disableScrollHandler.current = false;
                    break;
                case VirtualAction.AUTOSCROLL_NEXT:
                    if (!autoscrollNext && userScroll.current) {
                        break;
                    }

                    if (isTop(type)) {
                        if (userScroll.current && smoothAutoscroll) {
                            scrollByFirstElement(content, ref);
                            setTimeout(() => {
                                scrollTo(0, true, animationMs);
                                userScroll.current           = true;
                                disableScrollHandler.current = false;
                            });
                        } else {
                            scrollTo(0, false, animationMs);
                            userScroll.current           = true;
                            disableScrollHandler.current = false;
                        }
                    } else {
                        if (userScroll.current && smoothAutoscroll) {
                            scrollByLastElement(content, ref);
                            setTimeout(() => {
                                scrollTo(0, true, animationMs);
                                userScroll.current           = true;
                                disableScrollHandler.current = false;
                            });
                        } else {
                            scrollTo(0, false, animationMs);
                            userScroll.current           = true;
                            disableScrollHandler.current = false;
                        }
                    }
                    break;
                case VirtualAction.AUTOSCROLL_PREVIOUS:
                    if (!autoscrollPrevious && userScroll.current) {
                        break;
                    }

                    if (isTop(type)) {
                        if (userScroll.current && smoothAutoscroll) {
                            scrollByLastElement(content, ref);
                            setTimeout(() => {
                                scrollTo(ref.scrollHeight - ref.offsetHeight, true, animationMs);
                                userScroll.current           = true;
                                disableScrollHandler.current = false;
                            });
                        } else {
                            scrollTo(ref.scrollHeight - ref.offsetHeight, false, animationMs);
                            userScroll.current           = true;
                            disableScrollHandler.current = false;
                        }
                    } else {
                        if (userScroll.current && smoothAutoscroll) {
                            scrollByFirstElement(content, ref);
                            setTimeout(() => {
                                scrollTo(-(ref.scrollHeight - ref.offsetHeight), true, animationMs);
                                userScroll.current           = true;
                                disableScrollHandler.current = false;
                            });
                        } else {
                            userScroll.current           = true;
                            disableScrollHandler.current = false;
                            scrollTo(-(ref.scrollHeight - ref.offsetHeight), false, animationMs);
                        }
                    }
                    break;
                default:
                    disableScrollHandler.current = false;
                    break;

            }

            updatePreviousFirstElement();
            updatePreviousLastElement();
        }
        // eslint-disable-next-line
    }, [ animationMs, autoscrollNext, autoscrollPrevious, smoothAutoscroll, type, virtualList ]);


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
    }, [ scrollable ]);

    useLayoutEffect(() => {
        const ref = containerRef.current;

        if (ref) {
            if (ref.scrollHeight === ref.offsetHeight && scrollable === true) {
                setScrollable(false);
            } else if (ref.scrollHeight !== ref.offsetHeight && scrollable === false) {
                setScrollable(true);
            }
        }
    }, [ virtualList, scrollable ]);


    /*******************************************************************
     * On main list change
     ******************************************************************/

    const previousListLength    = useRef<number>(list.length);
    const previousFirstListItem = useRef<unknown>(list[0]);
    const previousLastListItem  = useRef<unknown>(list.slice(-1)[0]);

    const toggleToFirstItem = useCallback((type: VirtualType, list: VirtualList, showAmount: number) => {
        if (isTop(type)) {
            disableScrollHandler.current = true;
            setIndex(0, list, showAmount);
        } else {
            disableScrollHandler.current = true;
            setIndex(Math.max(0, list.length - showAmount), list, showAmount);
        }
        // eslint-disable-next-line
    }, []);

    const toggleToLastItem = useCallback((type: VirtualType, list: VirtualList, showAmount: number) => {
        if (isTop(type)) {
            disableScrollHandler.current = true;
            setIndex(Math.max(0, list.length - showAmount), list, showAmount);
        } else {
            disableScrollHandler.current = true;
            setIndex(0, list, showAmount);
        }
        // eslint-disable-next-line
    }, []);

    useLayoutEffect(() => {
        const content = contentRef.current;

        if (content) {
            const lengthDelta: number = list.length - previousListLength.current;
            const justRefresh         = lengthDelta <= 0;
            const firstItem           = list[0];
            const lastItem            = list.slice(-1)[0];

            if (justRefresh) {
                setIndex(currentIndex.current, list, showAmount);
                previousListLength.current    = list.length;
                previousLastListItem.current  = lastItem;
                previousFirstListItem.current = firstItem;
                return;
            }

            switch (previousScrollAction.current) {
                case VirtualAction.AUTOSCROLL_NEXT:
                    toggleToFirstItem(type, list, showAmount);
                    break;
                case VirtualAction.AUTOSCROLL_PREVIOUS:
                    toggleToLastItem(type, list, showAmount);
                    break;
                case VirtualAction.TOGGLE_PREVIOUS:
                    if (isTop(type)) {
                        if (lastItem !== previousLastListItem.current) {
                            disableScrollHandler.current = true;
                            setIndex(Math.max(list.length - showAmount, currentIndex.current + toggleDistance), list, showAmount);
                        }
                    } else {
                        if (firstItem !== previousFirstListItem.current) {
                            disableScrollHandler.current = true;
                            setIndex(Math.min(Math.max(0, list.length - showAmount), currentIndex.current + lengthDelta - toggleDistance), list, showAmount);
                        }
                    }
                    break;
                case VirtualAction.TOGGLE_NEXT:
                    if (isTop(type)) {
                        if (firstItem !== previousFirstListItem.current) {
                            disableScrollHandler.current = true;
                            setIndex(Math.max(list.length - showAmount, currentIndex.current + toggleDistance), list, showAmount);
                        }
                    } else {
                        if (lastItem !== previousLastListItem.current) {
                            disableScrollHandler.current = true;
                            setIndex(Math.min(Math.max(0, list.length - showAmount), currentIndex.current + lengthDelta - toggleDistance), list, showAmount);
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
        // eslint-disable-next-line
    }, [ list, showAmount, type ]);


    /*******************************************************************
     * Virtual actions
     ******************************************************************/

    const toFirstItem = useCallback(() => {
        previousScrollAction.current = VirtualAction.AUTOSCROLL_NEXT;
        userScroll.current           = false;
        toggleToFirstItem(type, list, showAmount);
    }, [ list, showAmount, toggleToFirstItem, type ]);


    /*******************************************************************
     * Permanent and virtual elements
     ******************************************************************/

    const nextPermanent = useMemo(() => {
        if (!permanentNextElement) {
            return null;
        }

        return permanentNextElement({ toFirstItem, currentIndex });
    }, [ currentIndex, permanentNextElement, toFirstItem ]);

    const previousPermanent = useMemo(() => {
        if (!permanentPreviousElement) {
            return null;
        }

        return permanentPreviousElement({
            toFirstItem,
            currentIndex,
        });
    }, [ currentIndex, permanentPreviousElement, toFirstItem ]);

    const additional = useMemo(() => {
        return additionalElements.map((callback) => callback({
            toFirstItem,
            currentIndex,
        }));
    }, [ additionalElements, currentIndex, toFirstItem ]);

    return (
        <div
            className={ classNames(css.container, {
                [css.top]       : isTop(type),
                [css.scrollable]: scrollable,
            }, [ className ]) }>
            <div className={ css.permanent }>
                { nextPermanent }
            </div>
            <div
                { ...other }
                className={ css.scrollContainer }
                ref={ containerRef }
            >
                { !hasMoreNext ? noMoreNextElement : null }
                <div
                    className={ classNames(css.content, {}, [ contentClassName ]) }
                    ref={ contentRef }
                >
                    { virtualList.map((item, index) => render(item, index, currentIndex.current)) }
                </div>
                { !hasMorePrevious ? noMorePreviousElement : null }
            </div>
            <div className={ css.permanent }>
                { previousPermanent }
            </div>
            <div
                className={
                    classNames(css.loader, {
                        [css.loading]: loadingNext,
                        [css.bottom] : !isTop(type),
                    })
                }
            >
                { loaderNextElement }
            </div>
            <div
                className={
                    classNames(css.loader, {
                        [css.loading]: loadingPrevious,
                        [css.bottom] : isTop(type),
                    })
                }
            >
                { loaderPreviousElement }
            </div>
            { additional }
            <div className={ css.scrollBar } ref={ scrollBarRef }>
                <div className={ css.marker } ref={ scrollMarkerRef }/>
            </div>
        </div>
    );
});