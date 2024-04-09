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
});