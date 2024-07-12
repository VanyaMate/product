import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    ReactNode, useEffect,
    useLayoutEffect, useRef,
} from 'react';
import classNames from 'classnames';
import css from './Dropdown.module.scss';
import {
    UseDropdownController,
} from '@/shared/ui-kit/modal/Dropdown/hooks/useDropdownController.ts';
import { createPortal } from 'react-dom';
import {
    getModalPosition,
} from '@/shared/lib/modal-position/getModalPosition.ts';


export type DropdownProps =
    {
        controller: UseDropdownController;
        dropdownContent: ReactNode;
    }
    & ComponentPropsWithoutRef<'div'>;

export const Dropdown: FC<DropdownProps> = memo(function Dropdown (props) {
    const {
              children,
              controller,
              dropdownContent,
              className,
              ...other
          }            = props;
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef  = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ref     = containerRef.current;
        const dropRef = dropdownRef.current;

        if (ref) {
            const onClickHandler  = (event: Event) => {
                event.stopPropagation();
                controller.setOpened((prev) => !prev);
            };
            const closeHandler    = () => controller.setOpened(false);
            const stopPropHandler = (event: Event) => event.stopPropagation();

            document.addEventListener('click', closeHandler);
            ref.addEventListener('click', onClickHandler);
            dropRef.addEventListener('click', stopPropHandler);
            return () => {
                document.removeEventListener('click', closeHandler);
                ref.removeEventListener('click', onClickHandler);
                dropRef.removeEventListener('click', stopPropHandler);
            };
        }
    }, [ controller ]);

    useLayoutEffect(() => {
        if (controller.opened) {
            const {
                      top,
                      left,
                  }                        = getModalPosition(containerRef, dropdownRef, 'bottom');
            dropdownRef.current.style.top  = `${ top }px`;
            dropdownRef.current.style.left = `${ left }px`;
        }
    }, [ controller.opened ]);

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
                        className={ classNames(css.dropdown, { [css.opened]: controller.opened }) }
                        ref={ dropdownRef }
                    >
                        { dropdownContent }
                    </div>,
                    document.body,
                )
            }
        </div>
    );
});