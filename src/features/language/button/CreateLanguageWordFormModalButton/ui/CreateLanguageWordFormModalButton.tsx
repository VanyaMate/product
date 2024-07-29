import { FC, memo } from 'react';
import {
    useModalController,
} from '@/shared/ui-kit/modal/Modal/hooks/useModalController.ts';
import { Modal } from '@/shared/ui-kit/modal/Modal/ui/Modal.tsx';
import {
    CreateLanguageWordForm,
} from '@/widgets/language/form/CreateLanguageWordForm/ui/CreateLanguageWordForm.tsx';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { IoAddCircleOutline } from 'react-icons/io5';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import { useTranslation } from 'react-i18next';


export type CreateLanguageWordFormModalButtonProps =
    {
        folderId: string;
    }
    & ButtonProps;

export const CreateLanguageWordFormModalButton: FC<CreateLanguageWordFormModalButtonProps> = memo(function CreateLanguageWordFormModalButton (props) {
    const { folderId, ...other } = props;
    const modalController        = useModalController();
    const { t }                  = useTranslation([ 'languages' ]);

    return (
        <>
            <Modal controller={ modalController }>
                <CreateLanguageWordForm
                    folderId={ folderId }
                    onSubmitHandler={ () => modalController.setOpened(false) }
                />
            </Modal>
            <PopOver popover={ t('add_word') }>
                <Button
                    { ...other }
                    onClick={ () => modalController.setOpened(true) }
                    quad
                    styleType={ ButtonStyleType.GHOST }
                >
                    <IoAddCircleOutline/>
                </Button>
            </PopOver>
        </>
    );
});