import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, useModalController } from '@/shared/ui-kit';
import { UserAuthFormWithUsernameByJsonServer } from '@/widgets/user';


export type OpenUserAuthFormButtonProps = {};

export const OpenUserAuthFormButton: FC<OpenUserAuthFormButtonProps> = memo(function OpenUserAuthFormButton (props) {
    const {}              = props;
    const { t }           = useTranslation();
    const modalController = useModalController();

    return (
        <>
            <Modal controller={ modalController }>
                <UserAuthFormWithUsernameByJsonServer
                    onSuccess={ () => modalController.setOpened(false) }
                />
            </Modal>
            <Button
                onClick={ () => modalController.setOpened(true) }
            >
                { t('user_auth_form_enter_button') }
            </Button>
        </>
    );
});