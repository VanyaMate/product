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
    getDifferentSide, getItemsByRange, getScrollDirection, isTop,
} from '@/shared/ui-kit/box/InfinityVirtual/lib/lib.ts';


export type UseIndexChangerProps = {
    index: number;
    setIndex: Dispatch<SetStateAction<number>>;
    items: Array<unknown>;
    setItems: Dispatch<SetStateAction<Array<unknown>>>
    showAmount: number;
    side: InfinityVirtualSide;
    ref: MutableRefObject<HTMLDivElement>;
    distanceToChange: number;
    hasMoreBottom: boolean;
    hasMoreTop: boolean;
    getBottomItems?: () => Promise<any>;
    getTopItems?: () => Promise<any>;
}

export type UseIndexChanger = {}

export const useIndexChanger = function (props: UseIndexChangerProps) {
    const previousScrollPosition = useRef<number>(0);
    const currentScrollDirection = useRef<InfinityVirtualSide>(getDifferentSide(props.side));
    const enableOfTriggers       = useRef<boolean>(true);

    // Run if required number of elements is not enough
    useLayoutEffect(() => {
        if (enableOfTriggers.current) {
            const notRequiredShowedItems = props.items.length !== props.showAmount;

            console.log('Run');
            if (notRequiredShowedItems) {

                const needLoadingTop: boolean = isTop(props.side) && props.hasMoreBottom && !!props.getBottomItems;
                console.log('need top', needLoadingTop);
                if (needLoadingTop) {
                    console.log('execute');

                    enableOfTriggers.current = false;
                    props.getBottomItems().finally(() => enableOfTriggers.current = true);
                    return;
                }
                const needLoadingBottom: boolean = !isTop(props.side) && props.hasMoreTop && !!props.getTopItems;

                console.log('need bottom', needLoadingTop);


                if (needLoadingBottom) {
                    console.log('execute bottom');
                    enableOfTriggers.current = false;
                    props.getTopItems().finally(() => enableOfTriggers.current = true);
                    return;
                }
            }
        }
        // eslint-disable-next-line
    }, [ props.items.length, props.showAmount, props.side, props.hasMoreBottom, props.hasMoreTop, props.getTopItems, props.getBottomItems ]);


    // Add scroll handler on container
    useLayoutEffect(() => {
        const ref = props.ref.current;

        if (ref) {
            previousScrollPosition.current = ref.scrollTop;

            const nextScroll = function () {
                if (ref.scrollTop === 0) {
                    ref.scrollTo({ top: isTop(props.side) ? 1 : -1 });
                }
            };

            const changeNext = async function () {
                if (isTop(props.side)) {
                    if (props.index !== 0) {
                        // toggle index and items
                        nextScroll();
                        const targetIndex = Math.max(props.index - Math.ceil(props.showAmount / 4), 0);
                        props.setIndex(targetIndex);
                        props.setItems(getItemsByRange(props.items, targetIndex, props.showAmount));
                    } else if (props.getTopItems && props.hasMoreTop) {
                        // execute loading -> then -> toggle index and items
                        return props.getTopItems().then(() => {
                            nextScroll();
                            const targetIndex = Math.max(props.index - Math.ceil(props.showAmount / 4), 0);
                            props.setIndex(targetIndex);
                            props.setItems(getItemsByRange(props.items, targetIndex, props.showAmount));
                        });
                    }
                } else {
                    if (props.index < props.items.length - props.showAmount) {
                        // toggle index and items
                        nextScroll();
                        const targetIndex = Math.min(props.index + Math.ceil(props.showAmount / 4), props.items.length - props.showAmount);
                        props.setIndex(targetIndex);
                        props.setItems(getItemsByRange(props.items, targetIndex, props.showAmount));
                    } else if (props.getBottomItems && props.hasMoreBottom) {
                        // execute loading -> then -> toggle index and items
                        return props.getBottomItems().then(() => {
                            nextScroll();
                            const targetIndex = Math.min(props.index + Math.ceil(props.showAmount / 4), props.items.length - props.showAmount);
                            props.setIndex(targetIndex);
                            props.setItems(getItemsByRange(props.items, targetIndex, props.showAmount));
                        });
                    }
                }
            };

            const changePrev = function () {
                if (isTop(props.side)) {
                    if (props.index < props.items.length - props.showAmount) {
                        // toggle index and items
                        nextScroll();
                        const targetIndex = Math.min(props.index + Math.ceil(props.showAmount / 4), props.items.length - props.showAmount);
                        props.setIndex(targetIndex);
                        props.setItems(getItemsByRange(props.items, targetIndex, props.showAmount));
                    } else if (props.getBottomItems && props.hasMoreTop) {
                        // execute loading -> then -> toggle index and items
                        return props.getBottomItems().then(() => {
                            nextScroll();
                            const targetIndex = Math.min(props.index + Math.ceil(props.showAmount / 4), props.items.length - props.showAmount);
                            props.setIndex(targetIndex);
                            props.setItems(getItemsByRange(props.items, targetIndex, props.showAmount));
                        });
                    }
                } else {
                    if (props.index !== 0) {
                        // toggle index and items
                        nextScroll();
                        const targetIndex = Math.max(props.index - Math.ceil(props.showAmount / 4), 0);
                        props.setIndex(targetIndex);
                        props.setItems(getItemsByRange(props.items, targetIndex, props.showAmount));
                    } else if (props.getTopItems && props.hasMoreBottom) {
                        // execute loading -> then -> toggle index and items
                        return props.getTopItems().then(() => {
                            nextScroll();
                            const targetIndex = Math.max(props.index - Math.ceil(props.showAmount / 4), 0);
                            props.setIndex(targetIndex);
                            props.setItems(getItemsByRange(props.items, targetIndex, props.showAmount));
                        });
                    }
                }
            };

            const onScrollHandler = function () {
                const { scrollHeight, scrollTop, offsetHeight } = ref;
                console.log('--------- ON SCROLL HANDLER ---------');

                if (enableOfTriggers.current) {
                    console.log('enabled triggers');
                    if (isTop(props.side)) {
                        if (scrollTop < props.distanceToChange && isTop(currentScrollDirection.current)) {
                            enableOfTriggers.current = false;
                            changePrev().finally(() => enableOfTriggers.current = true);
                        } else if (scrollHeight - offsetHeight - scrollTop < props.distanceToChange && !isTop(currentScrollDirection.current)) {
                            enableOfTriggers.current = false;
                            changeNext().finally(() => enableOfTriggers.current = true);
                        }
                    } else if (!isTop(props.side)) {
                        console.log('is bottom side', true);
                        if (Math.abs(scrollTop) < props.distanceToChange && isTop(currentScrollDirection.current)) {
                            console.log('trigger next');
                            enableOfTriggers.current = false;
                            changeNext().finally(() => enableOfTriggers.current = true);
                        } else if (scrollHeight - offsetHeight - Math.abs(scrollTop) < props.distanceToChange && !isTop(currentScrollDirection.current)) {
                            console.log('trigger prev');
                            enableOfTriggers.current = false;
                            changePrev().finally(() => enableOfTriggers.current = true);
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