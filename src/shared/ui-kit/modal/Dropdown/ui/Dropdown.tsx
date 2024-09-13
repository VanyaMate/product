import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    ReactNode,
    useLayoutEffect,
    useRef,
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
        containerClassName?: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const Dropdown: FC<DropdownProps> = memo(function Dropdown (props) {
    const {
              children,
              controller,
              dropdownContent,
              containerClassName,
              className,
              ...other
          }            = props;
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef  = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ref     = containerRef.current;
        const dropRef = dropdownRef.current;

        if (ref) {
            if (controller.opened && dropRef) {
                const closeHandler   = (event: Event) => {
                    if (!dropRef.contains(event.target as Node) && !ref.contains(event.target as Node)) {
                        controller.setOpened(false);
                    }
                };
                const onClickHandler = (event: Event) => {
                    if (ref.contains(event.target as Node)) {
                        controller.setOpened(false);
                    }
                };

                ref.addEventListener('click', onClickHandler, true);
                document.addEventListener('click', closeHandler, true);
                return () => {
                    document.removeEventListener('click', closeHandler, true);
                    ref.removeEventListener('click', onClickHandler, true);
                };
            } else {
                const onClickHandler = (event: Event) => {
                    if (ref.contains(event.target as Node)) {
                        controller.setOpened(true);
                    }
                };

                ref.addEventListener('click', onClickHandler, true);
                return () => {
                    ref.removeEventListener('click', onClickHandler, true);
                };
            }
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
                controller.opened ? createPortal(
                    <div
                        className={ classNames(css.dropdown, {}, [ containerClassName ]) }
                        ref={ dropdownRef }
                    >
                        { dropdownContent }
                    </div>,
                    document.body,
                ) : null
            }
        </div>
    );
});