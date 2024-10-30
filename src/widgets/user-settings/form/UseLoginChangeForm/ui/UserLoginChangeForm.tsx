import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useCallback, useMemo,
    useState,
} from 'react';
import classNames from 'classnames';
import css from './UserLoginChangeForm.module.scss';
import {
    userLoginUpdateEffect,
} from '@/app/model/auth/auth.model.ts';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';
import { useForm } from 'react-hook-form';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    isLoginValidatorRhf,
} from '@/app/react-hook-form/validator/isLoginValidatorRhf/isLoginValidatorRhf.ts';


type LoginChangeData = { login: string };

export type UserLoginChangeFormProps =
    {
        login: string;
    }
    & ComponentPropsWithoutRef<'form'>;

export const UserLoginChangeForm: FC<UserLoginChangeFormProps> = memo(function UserLoginChangeForm (props) {
    const { login, className, ...other }    = props;
    const { t }                             = useTranslation();
    const [ currentLogin, setCurrentLogin ] = useState<string>(login);

    const { handleSubmit, formState, reset, register } = useForm<{
        login: string,
    }>({
        values: { login },
        mode  : 'onChange',
    });
    const onSubmit                                     = useCallback((data: LoginChangeData) => {
        return userLoginUpdateEffect(data.login);
    }, []);

    const disableButton = useMemo(() => {
        return !formState.isValid || login === currentLogin;
    }, [ currentLogin, formState.isValid, login ]);

    const submitting = useMemo(() => {
        return formState.isSubmitting;
    }, [ formState.isSubmitting ]);

    const discard = useCallback(() => {
        reset();
        setCurrentLogin(login);
    }, [ login, reset ]);

    return (
        <form
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            onSubmit={ handleSubmit(onSubmit) }
        >
            <Col>
                <TextInput
                    autoComplete="off"
                    errorMessage={ formState.errors.login?.message }
                    label={ t.page.userSettings.login_label }
                    placeholder={ t.page.userSettings.login_placeholder }
                    required
                    type="text"
                    { ...register('login', {
                        required: true,
                        onChange: ({ target: { value } }) => setCurrentLogin(value),
                        validate: isLoginValidatorRhf,
                    }) }
                />
                <Row fullWidth spaceBetween>
                    <Button
                        aria-label={ t.page.userSettings.discard_changes }
                        disabled={ disableButton || submitting }
                        onClick={ discard }
                        styleType={ ButtonStyleType.GHOST }
                    >
                        { t.page.userSettings.discard_changes }
                    </Button>
                    <ButtonWithLoading
                        aria-label={ t.page.userSettings.apply_changes }
                        disabled={ disableButton }
                        loading={ submitting }
                        type="submit"
                    >
                        { t.page.userSettings.apply_changes }
                    </ButtonWithLoading>
                </Row>
            </Col>
        </form>
    );
});