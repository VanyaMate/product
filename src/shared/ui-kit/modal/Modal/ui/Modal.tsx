import { ComponentPropsWithoutRef, FC, memo } from 'react';
import { IModalController } from '../hooks/useModalController.ts';
import { useModalInnerManager } from '../hooks/useModalInnerManager.ts';
import { useTranslation } from 'react-i18next';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { Button } from '@/shared/ui-kit';
import css from './Modal.module.scss';
import { AiOutlineClose } from 'react-icons/ai';


export type ModalProps =
    {
        controller: IModalController;
    }
    & ComponentPropsWithoutRef<'div'>;

export const Modal: FC<ModalProps> = memo(function Modal (props) {
    const { className, controller, ...other } = props;
    const { t }                               = useTranslation();
    const { placeRef, modalRef }              = useModalInnerManager(controller.opened);

    return (
        <>
            <div ref={ placeRef }/>
            {
                createPortal(
                    <div
                        className={ classNames(css.container, { [css.hidden]: !controller.opened }, []) }
                        ref={ modalRef }
                    >
                        <Button aria-label={ t('close_modal_window_button') }
                                className={ css.closeButton }
                                onClick={ () => controller.setOpened(false) }
                        >
                            <AiOutlineClose/>
                        </Button>
                        <div className={ css.overlay }
                             onClick={ () => controller.setOpened(false) }/>
                        <div
                            className={ classNames(css.content, {}, [ className ]) } { ...other }/>
                    </div>,
                    document.body,
                )
            }
        </>
    );
});