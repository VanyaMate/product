import { FC, memo } from 'react';
import {
    useModalController,
} from '@/shared/ui-kit/modal/Modal/hooks/useModalController.ts';
import { Modal } from '@/shared/ui-kit/modal/Modal/ui/Modal.tsx';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { IoSettings } from 'react-icons/io5';
import {
    DomainLanguageFolder,
} from 'product-types/dist/language/DomainLanguageFolder';
import {
    UpdateLanguageFolderForm,
} from '@/widgets/language/form/UpdateLanguageFolderForm/ui/UpdateLanguageFolderForm.tsx';
import { useTranslation } from 'react-i18next';


export type UpdateLanguageFolderFormModalButtonProps =
    {
        folder: DomainLanguageFolder;
    }
    & ButtonProps;

export const UpdateLanguageFolderFormModalButton: FC<UpdateLanguageFolderFormModalButtonProps> = memo(function UpdateLanguageFolderFormModalButton (props) {
    const { folder, ...other } = props;
    const modalController      = useModalController();
    const { t }                = useTranslation([ 'languages' ]);

    return (
        <>
            <Modal controller={ modalController }>
                <UpdateLanguageFolderForm
                    folder={ folder }
                    onSubmitHandler={ () => modalController.setOpened(false) }
                />
            </Modal>
            <PopOver popover={ t('update_folder') }>
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