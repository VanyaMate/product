import {
    Dispatch,
    MutableRefObject,
    SetStateAction,
    useLayoutEffect,
    useRef,
} from 'react';
import {
    InfinityVirtualSide,
} from '@/shared/ui-kit/box/InfinityVirtual/types/InfinityVirtualSide.type.ts';
import {
    first,
    getDifferentSide,
    getItemsByRange,
    getScrollDirection,
    isTop, last,
} from '@/shared/ui-kit/box/InfinityVirtual/lib/lib.ts';


export type UseIndexChangerProps = {
    index: number;
    setIndex: Dispatch<SetStateAction<number>>;
    items: Array<unknown>;
    virtualItems: Array<unknown>
    setVirtualItems: Dispatch<SetStateAction<Array<unknown>>>
    showAmount: number;
    side: InfinityVirtualSide;
    ref: MutableRefObject<HTMLDivElement>;
    distanceToChange: number;
    hasMoreBottom: boolean;
    hasMoreTop: boolean;
    getBottomItems?: () => Promise<any>;
    getTopItems?: () => Promise<any>;
}

enum IndexChangeType {
    BOTTOM,
    TOP
}

export type UseIndexChanger = {}

export const useIndexChanger = function (props: UseIndexChangerProps) {
    const previousScrollPosition = useRef<number>(0);
    const currentScrollDirection = useRef<InfinityVirtualSide>(getDifferentSide(props.side));
    const enableOfTriggers       = useRef<boolean>(true);

    const previousFirstItem = useRef<unknown>(first(props.items));
    const previousLastItem  = useRef<unknown>(last(props.items));
    const initOffset        = useRef<IndexChangeType>(null);

    // Run if required number of elements is not enough
    useLayoutEffect(() => {
        if (enableOfTriggers.current) {
            const notRequiredShowedItems = props.items.length !== props.showAmount;

            if (notRequiredShowedItems) {
                const needLoadingTop: boolean = isTop(props.side) && props.hasMoreBottom && !!props.getBottomItems;

                if (needLoadingTop) {
                    enableOfTriggers.current = false;
                    props.getBottomItems()
                        .finally(() => enableOfTriggers.current = true);
                    return;
                }

                const needLoadingBottom: boolean = !isTop(props.side) && props.hasMoreTop && !!props.getTopItems;

                if (needLoadingBottom) {
                    enableOfTriggers.current = false;
                    props.getTopItems().finally(() => enableOfTriggers.current = true);
                    return;
                }
            }
        }
        // eslint-disable-next-line
    }, [ props.items.length, props.showAmount, props.side, props.hasMoreBottom, props.hasMoreTop, props.getTopItems, props.getBottomItems ]);

    useLayoutEffect(() => {
        const ref = props.ref.current;
        if (ref && (initOffset.current !== null)) {
            const firstItem                 = first(props.items);
            const lastItem                  = last(props.items);
            const firstItemChanged: boolean = firstItem !== previousFirstItem.current;
            const lastItemChanged: boolean  = lastItem !== previousLastItem.current;

            const nextScroll = function () {
                if (ref.scrollTop === 0) {
                    const scrollPosition = isTop(props.side) ? 1 : -1;
                    ref.scrollTo({ top: scrollPosition });
                } else if (Math.abs(ref.scrollTop) + 5 >= ref.scrollHeight - ref.offsetHeight) {
                    const scrollPosition = isTop(props.side)
                                           ? ref.scrollTop - 1
                                           : ref.scrollTop + 1;
                    ref.scrollTo({ top: scrollPosition });
                }
            };

            if (initOffset.current === IndexChangeType.TOP && firstItemChanged) {
                nextScroll();
                const targetIndex = Math.min(props.index + Math.ceil(props.showAmount / 4), props.items.length - props.showAmount);
                props.setIndex(targetIndex);
                props.setVirtualItems(getItemsByRange(props.items, targetIndex, props.showAmount));
                initOffset.current        = null;
                previousFirstItem.current = firstItem;
            } else if (initOffset.current === IndexChangeType.BOTTOM && lastItemChanged) {
                nextScroll();
                const targetIndex = Math.max(props.index - Math.ceil(props.showAmount / 4), 0);
                props.setIndex(targetIndex);
                props.setVirtualItems(getItemsByRange(props.items, targetIndex, props.showAmount));
                initOffset.current       = null;
                previousLastItem.current = lastItem;
            }
        }
    }, [ props, props.items ]);

    // Add scroll handler on container
    useLayoutEffect(() => {
        const ref = props.ref.current;

        if (ref) {
            previousScrollPosition.current = ref.scrollTop;

            const nextScroll = function () {
                if (ref.scrollTop === 0) {
                    const scrollPosition = isTop(props.side) ? 1 : -1;
                    ref.scrollTo({ top: scrollPosition });
                } else if (Math.abs(ref.scrollTop) + 5 >= ref.scrollHeight - ref.offsetHeight) {
                    const scrollPosition = isTop(props.side)
                                           ? ref.scrollTop - 1
                                           : ref.scrollTop + 1;
                    ref.scrollTo({ top: scrollPosition });
                }
            };

            const changeNext = async function () {
                if (isTop(props.side)) {
                    if (props.index !== 0) {
                        nextScroll();
                        const targetIndex = Math.max(props.index - Math.ceil(props.showAmount / 4), 0);
                        props.setIndex(targetIndex);
                        props.setVirtualItems(getItemsByRange(props.items, targetIndex, props.showAmount));
                    } else if (props.getTopItems && props.hasMoreTop) {
                        initOffset.current = IndexChangeType.TOP;
                        return props.getTopItems();
                    }
                } else {
                    if (props.index < props.items.length - props.showAmount) {
                        nextScroll();
                        const targetIndex = Math.min(props.index + Math.ceil(props.showAmount / 4), props.items.length - props.showAmount);
                        props.setIndex(targetIndex);
                        props.setVirtualItems(getItemsByRange(props.items, targetIndex, props.showAmount));
                    } else if (props.index >= props.items.length - props.showAmount && props.getBottomItems && props.hasMoreBottom) {
                        initOffset.current = IndexChangeType.BOTTOM;
                        return props.getBottomItems();
                    }
                }
            };

            const changePrev = async function () {
                if (isTop(props.side)) {
                    if (props.index < props.items.length - props.showAmount) {
                        nextScroll();
                        const targetIndex = Math.min(props.index + Math.ceil(props.showAmount / 4), props.items.length - props.showAmount);
                        props.setIndex(targetIndex);
                        props.setVirtualItems(getItemsByRange(props.items, targetIndex, props.showAmount));
                    } else if (props.index >= props.items.length - props.showAmount && props.getBottomItems && props.hasMoreTop) {
                        initOffset.current = IndexChangeType.BOTTOM;
                        return props.getBottomItems();
                    }
                } else {
                    if (props.index !== 0) {
                        nextScroll();
                        const targetIndex = Math.max(props.index - Math.ceil(props.showAmount / 4), 0);
                        props.setIndex(targetIndex);
                        props.setVirtualItems(getItemsByRange(props.items, targetIndex, props.showAmount));
                    } else if (props.getTopItems && props.hasMoreBottom) {
                        initOffset.current = IndexChangeType.TOP;
                        return props.getTopItems();
                    }
                }
            };

            const onScrollHandler = function () {
                const { scrollHeight, scrollTop, offsetHeight } = ref;

                if (enableOfTriggers.current) {
                    if (isTop(props.side)) {
                        if (scrollTop < props.distanceToChange && isTop(currentScrollDirection.current)) {
                            enableOfTriggers.current = false;
                            changePrev().finally(() => setTimeout(() => enableOfTriggers.current = true));
                        } else if (scrollHeight - offsetHeight - scrollTop < props.distanceToChange && !isTop(currentScrollDirection.current)) {
                            enableOfTriggers.current = false;
                            changeNext().finally(() => setTimeout(() => enableOfTriggers.current = true));
                        }
                    } else if (!isTop(props.side)) {
                        if (Math.abs(scrollTop) < props.distanceToChange && isTop(currentScrollDirection.current)) {
                            enableOfTriggers.current = false;
                            changeNext().finally(() => setTimeout(() => enableOfTriggers.current = true));
                        } else if (scrollHeight - offsetHeight - Math.abs(scrollTop) < props.distanceToChange && !isTop(currentScrollDirection.current)) {
                            enableOfTriggers.current = false;
                            changePrev().finally(() => setTimeout(() => enableOfTriggers.current = true));
                        }
                    }
                }

                currentScrollDirection.current = getScrollDirection(props.side, previousScrollPosition.current, scrollTop);
                previousScrollPosition.current = scrollTop;
            };

            ref.addEventListener('scroll', onScrollHandler);
            return () => ref.removeEventListener('scroll', onScrollHandler);
        }
    }, [ props ]);
};