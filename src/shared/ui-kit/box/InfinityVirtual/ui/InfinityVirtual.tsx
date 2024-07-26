import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    ReactNode,
} from 'react';
import classNames from 'classnames';
import css from './InfinityVirtual.module.scss';
import {
    InfinityVirtualSide,
} from '@/shared/ui-kit/box/InfinityVirtual/types/InfinityVirtualSide.type.ts';
import {
    useScrollHandler,
} from '@/shared/ui-kit/box/InfinityVirtual/hooks/useScrollHandler/useScrollHandler.ts';
import {
    useVirtualItems,
} from '@/shared/ui-kit/box/InfinityVirtual/hooks/useVirtualItems/useVirtualItems.ts';
import {
    useIndexChanger,
} from '@/shared/ui-kit/box/InfinityVirtual/hooks/useIndexChanger/useIndexChanger.ts';


export type InfinityVirtualProps =
    {
        items: Array<unknown>;
        render: (item: unknown, index: number) => ReactNode;
        smoothScroll?: boolean;
        showAmount?: number;
        distanceToChange?: number;
        side?: InfinityVirtualSide;
        reverse?: boolean;
        getBottomItems?: () => Promise<any>;
        getTopItems?: () => Promise<any>;
        hasMoreBottom?: boolean;
        hasMoreTop?: boolean;
        contentClassName?: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const InfinityVirtual: FC<InfinityVirtualProps> = memo(function InfinityVirtual (props) {
    const {
              items,
              render,
              showAmount       = 40,
              distanceToChange = 100,
              side             = 'top',
              reverse          = false,
              smoothScroll     = false,
              getBottomItems,
              getTopItems,
              hasMoreBottom    = true,
              hasMoreTop       = true,
              className,
              contentClassName,
              ...other
          } = props;

    const {
              index,
              setIndex,
              virtualItems,
              setVirtualItems,
          }            = useVirtualItems({ side, items, showAmount });
    const containerRef = useScrollHandler();

    console.log(smoothScroll);

    useIndexChanger({
        setItems: setVirtualItems,
        items,
        index,
        setIndex,
        side,
        getBottomItems,
        getTopItems,
        hasMoreBottom,
        hasMoreTop,
        showAmount,
        distanceToChange,
        ref     : containerRef,
    });

    return (
        <div
            { ...other }
            className={ classNames(css.container, { [css.top]: side === 'top' }, [ className ]) }
            ref={ containerRef }
        >
            <div
                className={ classNames(css.content, { [css.reverse]: reverse }, [ contentClassName ]) }
            >
                { virtualItems.map(render) }
            </div>
        </div>
    );
});