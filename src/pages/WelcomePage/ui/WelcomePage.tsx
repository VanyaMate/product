import { FC, memo } from 'react';
import { useWelcomeAuth } from '@/features/auth/hooks/useWelcomeAuth.ts';
import css from './WelcomePage.module.scss';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import {
    getAuthPending,
} from '@/app/redux/slices/auth/selectors/getAuthPending/getAuthPending.ts';
import classNames from 'classnames';
import {
    UserAuthFormWithUsernameAsync
} from '@/widgets/user/form/UserAuthFormWithUsernameByJsonServer/ui/UserAuthFormWithUsernameAsync.tsx';


export type WelcomePageProps = {};

export const WelcomePage: FC<WelcomePageProps> = memo(function WelcomePage (props) {
    const {}          = props;
    const authPending = useAppSelector(getAuthPending);

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