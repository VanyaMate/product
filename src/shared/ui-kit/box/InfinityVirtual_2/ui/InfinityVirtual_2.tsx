import { ComponentPropsWithoutRef, FC, memo, ReactNode } from 'react';
import classNames from 'classnames';
import css from './InfinityVirtual2.module.scss';


export enum InfinityVirtualType {
    TOP,
    BOTTOM
}

export type InfinityVirtual2Props =
    {
        items: Array<unknown>;
        render: (item: unknown, index: number) => ReactNode;
        smoothScroll?: boolean;
        showAmount?: number;
        distanceToToggle?: number;
        type?: InfinityVirtualType;
        reverseItems?: boolean;
        uploadNextItems?: () => Promise<unknown>;
        uploadPreviousItems?: () => Promise<unknown>;
        hasMoreNext?: boolean;
        hasMorePrevious?: boolean;
        contentClassName?: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const InfinityVirtual2: FC<InfinityVirtual2Props> = memo(function InfinityVirtual2 (props) {
    const {
              className,
              items,
              render,
              smoothScroll,
              showAmount,
              distanceToToggle,
              type,
              reverseItems,
              uploadNextItems,
              uploadPreviousItems,
              hasMoreNext,
              hasMorePrevious,
              contentClassName,
              ...other
          } = props;

    console.log(items, render, showAmount, smoothScroll, uploadNextItems, uploadPreviousItems, hasMoreNext, hasMorePrevious, distanceToToggle);

    return (
        <div
            { ...other }
            className={ classNames(css.container, { [css.top]: type === InfinityVirtualType.TOP }, [ className ]) }
        >
            <div
                className={ classNames(css.content, { [css.reverse]: reverseItems }, [ contentClassName ]) }
            >
                //
            </div>
        </div>
    );
});