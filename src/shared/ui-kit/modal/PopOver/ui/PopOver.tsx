import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    ReactNode, useEffect,
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
    const [ visible, setVisible ]                    = useState<boolean>(true);
    const raf                                        = useRef<ReturnType<typeof requestAnimationFrame>>(0);
    const containerRef                               = useRef<HTMLDivElement>(null);
    const popoverRef                                 = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ref = containerRef.current;
        if (ref) {
            const onMouseOver = () => {
                setOpened(true);
            };
            const onMouseOut  = () => {
                setOpened(false);
            };

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

    useEffect(() => {
        keyboardClose(opened, setOpened);
        setVisible(false);

        if (opened && containerRef.current && popoverRef.current) {
            const { top, left }           = getModalPosition(containerRef, popoverRef);
            raf.current                   = requestAnimationFrame(() => setVisible(true));
            popoverRef.current.style.top  = `${ top }px`;
            popoverRef.current.style.left = `${ left }px`;
        } else {
            cancelAnimationFrame(raf.current);
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
                        className={
                            classNames(
                                css.popover,
                                {
                                    [css.visible]: visible,
                                },
                            )
                        }
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