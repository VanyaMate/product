import { FC, memo } from 'react';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    useModalController,
} from '@/shared/ui-kit/modal/Modal/hooks/useModalController.ts';
import { Modal } from '@/shared/ui-kit/modal/Modal/ui/Modal.tsx';
import { IoAddCircle } from 'react-icons/io5';
import {
    CreateLanguageFolderForm,
} from '@/widgets/language/form/CreateLanguageFolderForm/ui/CreateLanguageFolderForm.tsx';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type CreateLanguageFolderFormModalButtonProps =
    {
        languageId: string;
    }
    & ButtonProps;

export const CreateLanguageFolderFormModalButton: FC<CreateLanguageFolderFormModalButtonProps> = memo(function CreateLanguageFolderFormModalButton (props) {
    const { languageId, ...other } = props;
    const modalController          = useModalController();
    const { t }                    = useTranslation();

    return (
        <>
            <Modal controller={ modalController }>
                <CreateLanguageFolderForm
                    languageId={ languageId }
                    onSubmitHandler={ () => modalController.setOpened(false) }
                />
            </Modal>
            <PopOver popover={ t.page.languages.add_language }>
                <Button
                    { ...other }
                    onClick={ () => modalController.setOpened(true) }
                    quad
                >
                    <IoAddCircle/>
                </Button>
            </PopOver>
        </>
    );
});