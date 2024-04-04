import React from 'react';
import css from './Modal.module.scss';
import classNames from 'classnames';
import {
    IModelController,
} from '@/components/shared/ui/modal/Modal/hooks/useModalController.ts';
import { createPortal } from 'react-dom';
import {
    useModalInnerManager,
} from '@/components/shared/ui/modal/Modal/hooks/useModalInnerManager.ts';
import Button from '@/components/shared/ui/buttons/Button/Button.tsx';
import { useTranslation } from 'react-i18next';


export type ModalProps =
    {
        controller: IModelController;
    }
    & React.ComponentPropsWithoutRef<'div'>;

const Modal: React.FC<ModalProps> = (props) => {
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
                        >X</Button>
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
};

export default React.memo(Modal);