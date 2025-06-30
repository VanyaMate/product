import { FC, memo } from 'react';
import css from './WelcomePage.module.scss';
import classNames from 'classnames';
import { useStore } from '@vanyamate/sec-react';
import { $authError, $authIsPending } from '@/app/model/auth/auth.model.ts';
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
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import { Card } from '@/shared/ui-kit/cards/Card/ui/Card.tsx';


export type WelcomePageProps = {};

export const WelcomePage: FC<WelcomePageProps> = memo(function WelcomePage (props) {
    const {}          = props;
    const authPending = useStore($authIsPending);
    const authError   = useStore($authError);
    const { t }       = useTranslation();

    useWelcomeAuth();

    return (
        <main className={ css.container }>
            <header>
                <h1>{ t.app.logo }</h1>
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
                {
                    authError
                    ? <Col>
                        {
                            authError.errors.map((error, index) => (
                                <Card key={ index } variant="danger">
                                    <header>
                                        <h3>{ error.title }</h3>
                                        <p>{ error.messages }</p>
                                    </header>
                                </Card>
                            ))
                        }
                    </Col>
                    : null
                }
                <div
                    className={ classNames(css.form, { [css.disabled]: authPending }) }
                >
                    <UserSignForm/>
                </div>
            </div>
        </main>
    );
});