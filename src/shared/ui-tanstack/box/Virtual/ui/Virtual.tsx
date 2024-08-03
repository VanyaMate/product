import {
    ComponentPropsWithoutRef,
    FC,
    memo, ReactNode,
    useLayoutEffect,
    useRef,
} from 'react';
import classNames from 'classnames';
import css from './Virtual.module.scss';
import { useVirtualizer } from '@tanstack/react-virtual';


export type VirtualSide = 'BOTTOM' | 'TOP';
export type VirtualUploader = () => Promise<unknown>;

export type VirtualProps =
    {
        list: Array<unknown>;
        render: (data: unknown, index: number) => ReactNode;
        estimateSize: number;
        gap: number;
        side: VirtualSide;
        hasNext?: boolean;
        uploadNext?: VirtualUploader;
        hasPrev?: boolean;
        uploadPrev?: VirtualUploader;
        loader?: ReactNode;
        noMore?: ReactNode;
    }
    & ComponentPropsWithoutRef<'div'>;

export const Virtual: FC<VirtualProps> = memo(function Virtual (props) {
    const {
              list,
              render,
              estimateSize,
              gap,
              side,
              hasPrev,
              uploadPrev,
              className,
              loader,
              noMore,
              ...other
          }            = props;
    const containerRef = useRef<HTMLDivElement>(null);

    const virtualizer = useVirtualizer({
        count           : list.length,
        gap             : gap,
        estimateSize    : () => estimateSize,
        getScrollElement: () => containerRef.current,
        overscan        : 5,
    });

    const items = virtualizer.getVirtualItems();

    useLayoutEffect(() => {
        const ref = containerRef.current;
        if (ref) {
            const onScrollHandler = function () {
                const { scrollTop } = containerRef.current;

                if (scrollTop <= 100 && hasPrev && uploadPrev) {
                    uploadPrev();
                }
            };

            ref.addEventListener('scroll', onScrollHandler);
            return () => ref.removeEventListener('scroll', onScrollHandler);
        }
    }, [ hasPrev, uploadPrev ]);

    return (
        <div
            { ...other }
            className={ classNames(css.container, { [css.bottom]: side === 'BOTTOM' }, [ className ]) }
        >
            <div
                className={ css.virtual }
                ref={ containerRef }
            >
                <div
                    className={ css.content }
                    style={ { height: virtualizer.getTotalSize() } }
                >
                    <div
                        className={ css.item }
                        style={ { transform: `translateY(${ items[0]?.start ?? 0 }px)` } }
                    >
                        {
                            hasPrev ? loader : noMore
                        }
                        {
                            items.map((virtualRow) => (
                                <div
                                    data-index={ virtualRow.index }
                                    key={ virtualRow.key }
                                    ref={ virtualizer.measureElement }
                                >
                                    { render(list[virtualRow.index], virtualRow.index) }
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
});