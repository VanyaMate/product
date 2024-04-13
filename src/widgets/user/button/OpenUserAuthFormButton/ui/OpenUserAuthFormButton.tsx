import { FC, memo, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Loader, Modal, useModalController } from '@/shared/ui-kit';
import {
    UserAuthFormWithUsernameByJsonServerAsync,
} from '@/widgets/user';


export type OpenUserAuthFormButtonProps = {};

export const OpenUserAuthFormButton: FC<OpenUserAuthFormButtonProps> = memo(function OpenUserAuthFormButton (props) {
    const {}              = props;
    const { t }           = useTranslation();
    const modalController = useModalController();

    return (
        <>
            <Modal controller={ modalController }>
                <Suspense fallback={ <Loader/> }>
                    {
                        modalController.opened
                        ? <UserAuthFormWithUsernameByJsonServerAsync
                            onSuccess={ () => modalController.setOpened(false) }
                        />
                        : null
                    }
                </Suspense>
            </Modal>
            <Button
                onClick={ () => modalController.setOpened(true) }
            >
                { t('user_auth_form_enter_button') }
            </Button>
        </>
    );
});