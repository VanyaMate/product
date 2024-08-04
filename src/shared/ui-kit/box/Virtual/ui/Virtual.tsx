/* eslint-disable */

import { ComponentPropsWithoutRef, FC, memo, ReactNode } from 'react';
import classNames from 'classnames';
import css from './Virtual.module.scss';
import { isTop } from '@/shared/ui-kit/box/Virtual/lib/isTop/isTop.ts';


export enum VirtualType {
    TOP,
    BOTTOM
}

export type VirtualList = Array<unknown>;
export type VirtualUploadMethod = () => Promise<unknown>;
export type VirtualRenderMethod = (item: unknown, index: number) => ReactNode;

export type VirtualProps =
    {
        list: VirtualList;
        render: VirtualRenderMethod;
        type?: VirtualType;
        smoothAutoscroll?: boolean;
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

    return (
        <div
            { ...other }
            className={ classNames(css.container, { [css.top]: isTop(type) }, [ className ]) }
        >
            <div
                className={ classNames(css.content, {}, [ contentClassName ]) }
            >
                //
            </div>
        </div>
    );
});