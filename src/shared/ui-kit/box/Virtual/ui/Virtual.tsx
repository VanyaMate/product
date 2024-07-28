import { ComponentPropsWithoutRef, FC, memo, ReactNode } from 'react';
import classNames from 'classnames';
import css from './Virtual.module.scss';
import {
    useVirtualItems,
} from '@/shared/ui-kit/box/Virtual/hooks/useVirtualItems.ts';
import {
    useVirtualActions,
} from '@/shared/ui-kit/box/Virtual/hooks/useVirtualActions.ts';
import {
    useVirtualScroll,
} from '@/shared/ui-kit/box/Virtual/hooks/useVirtualScroll.ts';
import {
    useVirtualFiller,
} from '@/shared/ui-kit/box/Virtual/hooks/useVirtualFiller.ts';


export enum VirtualType {
    TOP,
    BOTTOM
}

export type VirtualUploadMethod = () => Promise<unknown>;

export type VirtualProps =
    {
        items: Array<unknown>;
        render: (item: unknown, index: number) => ReactNode;
        smoothScroll?: boolean;
        showAmount?: number;
        distanceToTrigger?: number;
        type?: VirtualType;
        reverseItems?: boolean;
        uploadNext?: VirtualUploadMethod;
        uploadPrevious?: VirtualUploadMethod;
        hasMoreNext?: boolean;
        hasMorePrevious?: boolean;
        contentClassName?: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const Virtual: FC<VirtualProps> = memo(function Virtual (props) {
    const {
              className,
              items,
              render,
              smoothScroll      = true,
              showAmount        = 40,
              distanceToTrigger = 200,
              type              = VirtualType.TOP,
              reverseItems      = false,
              uploadNext,
              uploadPrevious,
              hasMoreNext       = true,
              hasMorePrevious   = true,
              contentClassName,
              ...other
          } = props;

    const { virtualItems, setCurrentIndex, currentIndex } = useVirtualItems({
        items,
        showAmount,
        type,
    });

    useVirtualFiller({
        type,
        setIndex          : setCurrentIndex,
        showAmount,
        virtualItemsLength: virtualItems.length,
        itemsLength       : items.length,
    });

    const { onOther, onNext, onPrev, actionType } = useVirtualActions({
        items,
        type,
        showAmount,
        setIndex   : setCurrentIndex,
        currentIndex,
        uploadNext,
        uploadPrev : uploadPrevious,
        hasMoreNext,
        hasMorePrev: hasMorePrevious,
    });
    const { ref }                                 = useVirtualScroll({
        virtualAction: actionType,
        virtualItems,
        type,
        distanceToTrigger,
        smoothScroll,
        otherHandler : onOther,
        nextHandler  : onNext,
        prevHandler  : onPrev,
    });

    return (
        <div
            { ...other }
            className={ classNames(css.container, { [css.top]: type === VirtualType.TOP }, [ className ]) }
            ref={ ref }
        >
            <div
                className={ classNames(css.content, { [css.reverse]: reverseItems }, [ contentClassName ]) }
            >
                { virtualItems.map(render) }
            </div>
        </div>
    );
});