import { FC, memo } from 'react';
import css from './WelcomePage.module.scss';
import classNames from 'classnames';
import { useStore } from '@vanyamate/sec-react';
import { $authIsPending } from '@/app/model/auth/auth.model.ts';
import {
    UserSignForm,
} from '@/widgets/user/form/UserSignForm/ui/UserSignForm.tsx';
import { Image } from '@/shared/ui-kit/image/Image/ui/Image.tsx';
import { Select } from '@/shared/ui-kit/select/Select/ui/Select.tsx';


export type WelcomePageProps = {};

export const WelcomePage: FC<WelcomePageProps> = memo(function WelcomePage (props) {
    const {}          = props;
    const authPending = useStore($authIsPending);

    // useWelcomeAuth();

    return (
        <main className={ css.container }>
            <div className={ css.content }>
                <Image
                    alt="Logo"
                    className={ css.logo }
                    src="/images/logo/android-chrome-192x192.png"
                />
                <div
                    className={ classNames(css.form, { [css.disabled]: authPending }) }
                >
                    <UserSignForm/>
                </div>
                <Select options={ [
                    { value: '1', label: 'Первый' },
                    { value: '2', label: 'Второй' },
                    { value: '3', label: 'Третий' },
                ] }/>
            </div>
        </main>
    );
});