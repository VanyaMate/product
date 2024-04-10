import { FC, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Modal, useModalController } from '@/shared/ui-kit';
import { UserAuthFormWithUsernameByJsonServer } from '@/widgets/user';


export type UserAuthButtonProps = {};

export const UserAuthButton: FC<UserAuthButtonProps> = memo(function UserAuthButton (props) {
    const {}              = props;
    const { t }           = useTranslation();
    const modalController = useModalController();

    return (
        <>
            <Modal controller={ modalController }>
                <UserAuthFormWithUsernameByJsonServer
                    onSuccess={ () => {
                        console.log('Execute');
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