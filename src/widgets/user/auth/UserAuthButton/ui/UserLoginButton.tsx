import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, useModalController } from '@/shared/ui-kit';
import { UserAuthFormWithUsernameByJsonServer } from '@/widgets/user';


export type UserLoginButtonProps = {};

export const UserLoginButton: FC<UserLoginButtonProps> = memo(function UserLoginButton (props) {
    const {}              = props;
    const { t }           = useTranslation();
    const modalController = useModalController();

    return (
        <>
            <Modal controller={ modalController }>
                <UserAuthFormWithUsernameByJsonServer/>
            </Modal>
            <Button
                onClick={ () => modalController.setOpened(true) }
            >
                { t('user_auth_form_enter_button') }
            </Button>
        </>
    );
});