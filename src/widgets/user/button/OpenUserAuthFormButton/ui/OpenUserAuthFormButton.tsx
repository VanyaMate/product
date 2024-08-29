import { FC, memo, Suspense } from 'react';
import {
    useModalController,
} from '@/shared/ui-kit/modal/Modal/hooks/useModalController.ts';
import { Modal } from '@/shared/ui-kit/modal/Modal/ui/Modal.tsx';
import { Loader } from '@/shared/ui-kit/loaders/Loader/ui/Loader.tsx';
import {
    UserSignInFormWithLoginAsync,
} from '@/widgets/user/form/UserSignInFormWithLogin/ui/UserSignInFormWithLogin.async.tsx';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


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
                        ? <UserSignInFormWithLoginAsync
                            onSuccess={ () => modalController.setOpened(false) }
                        />
                        : null
                    }
                </Suspense>
            </Modal>
            <Button
                onClick={ () => modalController.setOpened(true) }
            >
                { t.app.user_auth_form_enter_button }
            </Button>
        </>
    );
});