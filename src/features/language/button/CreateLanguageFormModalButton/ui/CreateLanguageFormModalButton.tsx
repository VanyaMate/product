import { FC, memo } from 'react';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { IoAddCircle } from 'react-icons/io5';
import { Modal } from '@/shared/ui-kit/modal/Modal/ui/Modal.tsx';
import {
    CreateLanguageForm,
} from '@/widgets/language/form/CreateLanguageForm/ui/CreateLanguageForm.tsx';
import {
    useModalController,
} from '@/shared/ui-kit/modal/Modal/hooks/useModalController.ts';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type CreateLanguageFormModalButtonProps =
    {}
    & ButtonProps;

export const CreateLanguageFormModalButton: FC<CreateLanguageFormModalButtonProps> = memo(function CreateLanguageFormModalButton (props) {
    const { ...other }    = props;
    const modalController = useModalController();
    const { t }           = useTranslation();

    return (
        <>
            <Modal controller={ modalController }>
                <CreateLanguageForm
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