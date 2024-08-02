import {
    VirtualType,
    VirtualUploadMethod,
} from '@/shared/ui-kit/box/Virtual/ui/Virtual.tsx';
import {
    VirtualIndexSetter,
} from '@/shared/ui-kit/box/Virtual/hooks/useVirtualItems.ts';
import {
    MutableRefObject,
    useCallback,
    useLayoutEffect,
    useRef,
} from 'react';
import {
    getNextIndex,
} from '@/shared/ui-kit/box/Virtual/lib/getNextIndex/getNextIndex.ts';
import {
    isStartOfItems,
} from '@/shared/ui-kit/box/Virtual/lib/isStart/isStartOfItems.ts';
import {
    isEndOfItems,
} from '@/shared/ui-kit/box/Virtual/lib/isEndOfItems/isEndOfItems.ts';
import {
    getLastIndex,
} from '@/shared/ui-kit/box/Virtual/lib/getLastIndex/getLastIndex.ts';
import {
    getPreviousIndex,
} from '@/shared/ui-kit/box/Virtual/lib/getPreviousIndex/getPreviousIndex.ts';
import {
    useVirtualPreviousItems,
} from '@/shared/ui-kit/box/Virtual/hooks/useVirtualPreviousItems.ts';
import {
    isNextChanges,
} from '@/shared/ui-kit/box/Virtual/lib/isNextChanges/isNextChanges.ts';
import {
    isPreviousChanges,
} from '@/shared/ui-kit/box/Virtual/lib/isPreviousChanges/isPreviousChanges.ts';


export enum VirtualAction {
    LOADING_NEXT,
    LOADING_PREVIOUS,
    TOGGLE_NEXT,
    TOGGLE_PREVIOUS,
    AUTOSCROLL,
    NONE
}

export type UseVirtualActions = {
    onNext: () => void;
    onPrev: () => void;
    onOther: () => void;
    actionType: MutableRefObject<VirtualAction>;
}

export type UseVirtualActionsProps = {
    type: VirtualType;
    currentIndex: number;
    setIndex: VirtualIndexSetter;
    items: Array<unknown>;
    showAmount: number;
    hasMoreNext: boolean;
    hasMorePrev: boolean;
    uploadNext?: VirtualUploadMethod;
    uploadPrev?: VirtualUploadMethod;
}

export const useVirtualActions = function (props: UseVirtualActionsProps): UseVirtualActions {
    const dynamicActionType = useRef<VirtualAction>(VirtualAction.AUTOSCROLL);
    const processActionType = useRef<VirtualAction>(VirtualAction.NONE);
    const previous          = useVirtualPreviousItems(props.items);

    // Change index
    useLayoutEffect(() => {
        const itemsLengthNotChanged: boolean = previous.length.current === props.items.length;
        if (itemsLengthNotChanged) {
            return;
        }

        const itemsLengthDecreased: boolean = previous.length.current > props.items.length;
        if (itemsLengthDecreased) {
            return;
        }

        switch (dynamicActionType.current) {
            case VirtualAction.AUTOSCROLL:
                if (isNextChanges({
                    type         : props.type,
                    previousFirst: previous.first.current,
                    previousLast : previous.last.current,
                    items        : props.items,
                })) {
                    console.log('Autoscroll', dynamicActionType.current);
                    props.setIndex(getLastIndex({
                        type       : props.type,
                        itemsLength: props.items.length,
                        showAmount : props.showAmount,
                    }));
                }
                break;
            case VirtualAction.TOGGLE_NEXT:
            case VirtualAction.LOADING_NEXT:
                if (isNextChanges({
                    type         : props.type,
                    previousFirst: previous.first.current,
                    previousLast : previous.last.current,
                    items        : props.items,
                })) {
                    console.log('Toggle NEXT, Loading NEXT', dynamicActionType.current);
                    props.setIndex(getNextIndex({
                        type        : props.type,
                        itemsLength : props.items.length,
                        showAmount  : props.showAmount,
                        currentIndex: props.currentIndex,
                    }));
                }
                break;
            case VirtualAction.TOGGLE_PREVIOUS:
            case VirtualAction.LOADING_PREVIOUS:
                console.log('Toggle PREVIOUS, Loading PREVIOUS', dynamicActionType.current);
                if (isPreviousChanges({
                    type         : props.type,
                    previousFirst: previous.first.current,
                    previousLast : previous.last.current,
                    items        : props.items,
                })) {
                    props.setIndex(getPreviousIndex({
                        type        : props.type,
                        itemsLength : props.items.length,
                        showAmount  : props.showAmount,
                        currentIndex: props.currentIndex,
                    }));
                }
                break;
            default:
                break;
        }

        previous.update(props.items);
    }, [ previous, previous.first, previous.last, previous.length, props, props.items ]);

    const onNext = useCallback(() => {
        if (dynamicActionType.current === VirtualAction.NONE) {
            if (isStartOfItems({
                type        : props.type,
                showAmount  : props.showAmount,
                currentIndex: props.currentIndex,
                itemsLength : props.items.length,
            })) {
                if (props.hasMoreNext && props.uploadNext) {
                    dynamicActionType.current = VirtualAction.LOADING_NEXT;

                    if (processActionType.current === VirtualAction.NONE) {
                        processActionType.current = VirtualAction.LOADING_NEXT;

                        props.uploadNext().finally(() => {
                            if (dynamicActionType.current === VirtualAction.LOADING_NEXT) {
                                dynamicActionType.current = VirtualAction.TOGGLE_NEXT;
                                processActionType.current = VirtualAction.NONE;
                            } else {
                                processActionType.current = VirtualAction.NONE;
                            }
                        });
                    }
                } else {
                    dynamicActionType.current = VirtualAction.AUTOSCROLL;
                    processActionType.current = VirtualAction.NONE;
                }
            } else {
                dynamicActionType.current = VirtualAction.NONE;
                props.setIndex(
                    getNextIndex({
                        type        : props.type,
                        itemsLength : props.items.length,
                        showAmount  : props.showAmount,
                        currentIndex: props.currentIndex,
                    }),
                );
            }
        }
    }, [ props ]);

    const onPrev = useCallback(() => {
        if (dynamicActionType.current === VirtualAction.NONE) {
            if (isEndOfItems({
                type        : props.type,
                showAmount  : props.showAmount,
                currentIndex: props.currentIndex,
                itemsLength : props.items.length,
            })) {
                if (props.hasMorePrev && props.uploadPrev) {
                    dynamicActionType.current = VirtualAction.LOADING_PREVIOUS;

                    if (processActionType.current === VirtualAction.NONE) {
                        processActionType.current = VirtualAction.LOADING_PREVIOUS;

                        props.uploadPrev().finally(() => {
                            if (dynamicActionType.current === VirtualAction.LOADING_PREVIOUS) {
                                dynamicActionType.current = VirtualAction.TOGGLE_PREVIOUS;
                                processActionType.current = VirtualAction.NONE;
                            } else {
                                processActionType.current = VirtualAction.NONE;
                            }
                        });
                    }
                } else {
                    dynamicActionType.current = VirtualAction.NONE;
                    processActionType.current = VirtualAction.NONE;
                }
            } else {
                dynamicActionType.current = VirtualAction.NONE;
                props.setIndex(
                    getPreviousIndex({
                        type        : props.type,
                        itemsLength : props.items.length,
                        showAmount  : props.showAmount,
                        currentIndex: props.currentIndex,
                    }),
                );
            }
        }
    }, [ props ]);

    const onOther = useCallback(() => {
        dynamicActionType.current = VirtualAction.NONE;
    }, []);

    return {
        onNext,
        onOther,
        onPrev,
        actionType: dynamicActionType,
    };
};