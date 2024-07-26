import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    ReactNode,
} from 'react';
import classNames from 'classnames';
import css from './InfinityVirtual.module.scss';
import {
    useVisibleElementIndex,
} from '@/shared/ui-kit/box/InfinityVirtual/hooks/useVisibleElementIndex.ts';
import {
    InfinityVirtualSide,
} from '@/shared/ui-kit/box/InfinityVirtual/types/InfinityVirtualSide.type.ts';
import {
    useHandlerOfSidePositions,
} from '@/shared/ui-kit/box/InfinityVirtual/hooks/useHandlerOfSidePositions.ts';
import {
    useStepsHandlers,
} from '@/shared/ui-kit/box/InfinityVirtual/hooks/useStepsHandlers.ts';
import {
    useAutoScroll,
} from '@/shared/ui-kit/box/InfinityVirtual/hooks/useAutoScroll.ts';


export type InfinityVirtualProps =
    {
        data: Array<unknown>;
        render: (item: unknown, index: number) => ReactNode;
        enableAutoScroll?: boolean;
        showAmount?: number;
        side?: InfinityVirtualSide;
        reverse?: boolean;
        getPreviousElements?: () => Promise<any>;
        getNextElements?: () => Promise<any>;
        hasMorePrevious?: boolean;
        hasMoreNext?: boolean;
        contentClassName?: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const InfinityVirtual: FC<InfinityVirtualProps> = memo(function InfinityVirtual (props) {
    const {
              data,
              render,
              showAmount       = 40,
              side             = 'top',
              reverse          = false,
              enableAutoScroll = false,
              getPreviousElements,
              getNextElements,
              hasMorePrevious  = true,
              hasMoreNext      = true,
              className,
              contentClassName,
              ...other
          }                   = props;
    const [ index, setIndex ] = useVisibleElementIndex(data, showAmount, side);
    const [ previous, next ]  = useStepsHandlers(data.length, showAmount, index, setIndex, getPreviousElements, getNextElements);
    const contentRef          = useHandlerOfSidePositions(previous, next, hasMorePrevious, hasMoreNext);

    useAutoScroll(data, showAmount, index, side, contentRef, enableAutoScroll);

    return (
        <div { ...other }
             className={ classNames(css.container, { [css.top]: side === 'top' }, [ className ]) }>
            <div
                className={ classNames(css.content, { [css.reverse]: reverse }, [ contentClassName ]) }
                ref={ contentRef }
            >
                { data.slice(index, index + showAmount).map(render) }
            </div>
        </div>
    );
});