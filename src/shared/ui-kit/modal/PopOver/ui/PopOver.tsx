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
import {
    getModalPosition,
} from '@/shared/lib/modal-position/getModalPosition.ts';


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
            const { top, left }           = getModalPosition(containerRef, popoverRef);
            popoverRef.current.style.top  = `${ top }px`;
            popoverRef.current.style.left = `${ left }px`;
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
                opened ? createPortal(
                    <div
                        className={ css.popover }
                        ref={ popoverRef }
                    >
                        { popover }
                    </div>,
                    document.body,
                ) : null
            }
        </div>
    );
});