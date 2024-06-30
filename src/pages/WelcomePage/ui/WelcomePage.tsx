import { FC, memo } from 'react';
import { useWelcomeAuth } from '@/features/auth/hooks/useWelcomeAuth.ts';
import css from './WelcomePage.module.scss';
import classNames from 'classnames';
import {
    UserAuthFormWithUsernameAsync,
} from '@/widgets/user/form/UserAuthFormWithUsernameByJsonServer/ui/UserAuthFormWithUsernameAsync.tsx';
import { useStore } from '@vanyamate/sec-react';
import { authIsPending } from '@/app/model/auth/auth.model.ts';


export type WelcomePageProps = {};

export const WelcomePage: FC<WelcomePageProps> = memo(function WelcomePage (props) {
    const {}          = props;
    const authPending = useStore(authIsPending);

    useWelcomeAuth();

    return (
        <div className={ css.container }>
            <div
                className={ classNames(css.form, { [css.disabled]: authPending }) }
            >
                <UserAuthFormWithUsernameAsync/>
            </div>
        </div>
    );
});