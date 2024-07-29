import { FC, memo } from 'react';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    useModalController,
} from '@/shared/ui-kit/modal/Modal/hooks/useModalController.ts';
import { Modal } from '@/shared/ui-kit/modal/Modal/ui/Modal.tsx';
import {
    UpdateLanguageForm,
} from '@/widgets/language/form/UpdateLanguageForm/ui/UpdateLanguageForm.tsx';
import { DomainLanguage } from 'product-types/dist/language/DomainLanguage';
import { IoSettings } from 'react-icons/io5';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import { useTranslation } from 'react-i18next';


export type UpdateLanguageFormModalButtonProps =
    {
        language: DomainLanguage;
    }
    & ButtonProps;

export const UpdateLanguageFormModalButton: FC<UpdateLanguageFormModalButtonProps> = memo(function UpdateLanguageFormModalButton (props) {
    const { language, ...other } = props;
    const modalController        = useModalController();
    const { t }                  = useTranslation([ 'languages' ]);

    return (
        <>
            <Modal controller={ modalController }>
                <UpdateLanguageForm
                    language={ language }
                    onSubmitHandler={ () => modalController.setOpened(false) }
                />
            </Modal>
            <PopOver popover={ t('update_language') }>
                <Button
                    { ...other }
                    onClick={ () => modalController.setOpened(true) }
                    quad
                >
                    <IoSettings/>
                </Button>
            </PopOver>
        </>
    );
});