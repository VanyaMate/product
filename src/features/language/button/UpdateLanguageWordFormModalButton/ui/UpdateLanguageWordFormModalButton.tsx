import { FC, memo } from 'react';
import {
    DomainLanguageWord,
} from 'product-types/dist/language/DomainLanguageWord';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    useModalController,
} from '@/shared/ui-kit/modal/Modal/hooks/useModalController.ts';
import { Modal } from '@/shared/ui-kit/modal/Modal/ui/Modal.tsx';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import { IoSettings } from 'react-icons/io5';
import {
    UpdateLanguageWordForm,
} from '@/widgets/language/form/UpdateLanguageWordForm/ui/UpdateLanguageWordForm.tsx';
import { useTranslation } from 'react-i18next';


export type UpdateLanguageWordFormModalButtonProps =
    {
        word: DomainLanguageWord;
    }
    & ButtonProps;

export const UpdateLanguageWordFormModalButton: FC<UpdateLanguageWordFormModalButtonProps> = memo(function UpdateLanguageWordFormModalButton (props) {
    const { word, ...other } = props;
    const modalController    = useModalController();
    const { t }              = useTranslation([ 'languages' ]);

    return (
        <>
            <Modal controller={ modalController }>
                <UpdateLanguageWordForm
                    onSubmitHandler={ () => modalController.setOpened(false) }
                    word={ word }
                />
            </Modal>
            <PopOver popover={ t('update_word') }>
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