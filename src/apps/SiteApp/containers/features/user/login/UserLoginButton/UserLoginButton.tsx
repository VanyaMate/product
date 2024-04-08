import React from 'react';
import Button from '@/components/shared/ui/buttons/Button/Button.tsx';
import { useTranslation } from 'react-i18next';
import Modal from '@/components/shared/ui/modal/Modal/Modal.tsx';
import {
    useModalController,
} from '@/components/shared/ui/modal/Modal/hooks/useModalController.ts';
import UserAuthFormWithUsernameByJsonServer
    from '@/apps/SiteApp/containers/features/user/login/UserAuthFormWithUsernameByJsonServer/UserAuthFormWithUsernameByJsonServer.tsx';


export type UserLoginButtonProps = {};

const UserLoginButton: React.FC<UserLoginButtonProps> = (props) => {
    const {}              = props;
    const { t }           = useTranslation();
    const modalController = useModalController();

    return (
        <>
            <Modal controller={ modalController }>
                <UserAuthFormWithUsernameByJsonServer
                    onError={ (error) => {
                        console.log('Show error notification: ', error);
                    } }
                    onSuccess={ (user) => {
                        console.log('LogIn as', user);
                        modalController.setOpened(false);
                    } }
                />
            </Modal>
            <Button
                onClick={ () => modalController.setOpened(true) }
            >
                { t('user_auth_form_enter_button') }
            </Button>
        </>
    );
};

export default React.memo(UserLoginButton);