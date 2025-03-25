import { FC, memo } from 'react';
import css from './WelcomePage.module.scss';
import classNames from 'classnames';
import { useStore } from '@vanyamate/sec-react';
import { $authIsPending } from '@/app/model/auth/auth.model.ts';
import {
    UserSignForm,
} from '@/widgets/user/form/UserSignForm/ui/UserSignForm.tsx';
import { useWelcomeAuth } from '@/features/auth/hooks/useWelcomeAuth.ts';
import {
    ToggleThemeButton,
} from '@/features/theme/button/ToggleThemeButton/ui/ToggleThemeButton.tsx';
import {
    ToggleLanguageButton,
} from '@/features/i18n/button/ToggleLanguageButton/ui/ToggleLanguageButton.tsx';


export type WelcomePageProps = {};

export const WelcomePage: FC<WelcomePageProps> = memo(function WelcomePage (props) {
    const {}          = props;
    const authPending = useStore($authIsPending);

    useWelcomeAuth();

    return (
        <main className={ css.container }>
            <header>
                <h1>Liberty</h1>
                <ul>
                    <li>
                        <ToggleThemeButton/>
                    </li>
                    <li>
                        <ToggleLanguageButton/>
                    </li>
                </ul>
            </header>
            <div className={ css.content }>
                <div
                    className={ classNames(css.form, { [css.disabled]: authPending }) }
                >
                    <UserSignForm/>
                </div>
            </div>
        </main>
    );
});