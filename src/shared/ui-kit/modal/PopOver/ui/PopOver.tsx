import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    ReactNode,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import classNames from 'classnames';
import css from './PopOver.module.scss';
import { keyboardClose } from '@/shared/lib/react/keyboardClose.ts';
import { createPortal } from 'react-dom';


export type PopOverProps =
    {
        popover: ReactNode;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PopOver: FC<PopOverProps> = memo(function PopOver (props) {
    const { popover, children, className, ...other } = props;
    const [ opened, setOpened ]                      = useState<boolean>(false);
    const containerRef                               = useRef<HTMLDivElement>(null);
    const popoverRef                                 = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ref = containerRef.current;
        if (ref) {
            const onMouseOver = () => setOpened(true);
            const onMouseOut  = () => setOpened(false);

            ref.addEventListener('mouseover', onMouseOver);
            ref.addEventListener('mouseout', onMouseOut);
            ref.addEventListener('focus', onMouseOver);
            ref.addEventListener('focusin', onMouseOver);
            ref.addEventListener('focusout', onMouseOut);

            return () => {
                ref.removeEventListener('mouseover', onMouseOver);
                ref.removeEventListener('mouseout', onMouseOut);
                ref.removeEventListener('focus', onMouseOver);
                ref.removeEventListener('focusin', onMouseOver);
                ref.removeEventListener('focusout', onMouseOut);
            };
        }
    }, []);

    useLayoutEffect(() => {
        keyboardClose(opened, setOpened);

        if (opened && containerRef.current && popoverRef.current) {
            // get container position
            const {
                      top,
                      left,
                      right,
                      width,
                      height,
                  }             = containerRef.current.getBoundingClientRect();
            const popoverHeight = popoverRef.current.clientHeight;
            const popoverWidth  = popoverRef.current.clientWidth;
            const bodyWidth     = document.body.clientWidth;

            // calculate popover position
            const topPosition: number = top > (popoverHeight + 5)
                                        ? top - popoverHeight - 5
                                        : top + height + 5;
            let leftPosition: number  = 0;
            const leftCenterPosition  = left + width / 2;
            const rightCenterPosition = bodyWidth - right + width / 2;
            const halfPopoverWidth    = popoverWidth / 2;

            if (bodyWidth <= popoverWidth) {
                leftPosition = leftCenterPosition - halfPopoverWidth;
            } else if (leftCenterPosition > halfPopoverWidth) {
                if (rightCenterPosition > halfPopoverWidth) {
                    leftPosition = leftCenterPosition - halfPopoverWidth;
                } else {
                    leftPosition = leftCenterPosition - halfPopoverWidth - (halfPopoverWidth - rightCenterPosition);
                }
            } else {
                leftPosition = leftCenterPosition - halfPopoverWidth + (halfPopoverWidth - leftCenterPosition);
            }

            // set popover position
            popoverRef.current.style.top  = `${ topPosition }px`;
            popoverRef.current.style.left = `${ leftPosition }px`;
        }

    }, [ opened ]);

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            ref={ containerRef }
        >
            { children }
            {
                createPortal(
                    <div
                        className={ classNames(css.popover, { [css.opened]: opened }) }
                        ref={ popoverRef }
                    >
                        { popover }
                    </div>,
                    document.body,
                )
            }
        </div>
    );
});