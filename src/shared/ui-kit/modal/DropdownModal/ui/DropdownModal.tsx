import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    ReactNode,
    useEffect,
    useRef,
} from 'react';
import classNames from 'classnames';
import css from './DropdownModal.module.scss';
import {
    IModalController,
} from '@/shared/ui-kit/modal/Modal/hooks/useModalController.ts';
import { createPortal } from 'react-dom';


// TEMP COMPONENT //

export type DropdownModalProps =
    {
        dropdown: ReactNode;
        controller: IModalController;
    }
    & ComponentPropsWithoutRef<'div'>;

export const DropdownModal: FC<DropdownModalProps> = memo(function DropdownModal (props) {
    const { className, children, dropdown, controller, ...other } = props;

    const placeRef    = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (controller.opened) {
            dropdownRef.current.style.height = dropdownRef.current.scrollHeight + 'px';
            const placeClientRect            = placeRef.current.getBoundingClientRect();
            dropdownRef.current.style.top    = (placeClientRect.bottom + 15) + 'px';
            dropdownRef.current.style.left   = (placeClientRect.right - dropdownRef.current.scrollWidth) + 'px';
        } else {
            dropdownRef.current.style.height = '0px';
        }
    }, [ controller.opened ]);

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <div ref={ placeRef }>
                { children }
            </div>
            {
                createPortal(
                    <div className={ classNames(css.dropdown, {}, []) }
                         ref={ dropdownRef }>
                        { dropdown }
                    </div>,
                    document.body,
                )
            }
        </div>
    );
});