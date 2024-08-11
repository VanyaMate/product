import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useCallback,
    useState,
} from 'react';
import classNames from 'classnames';
import css from './UserLoginChangeForm.module.scss';
import { Form } from '@/shared/ui-kit/forms/Form/ui/Form.tsx';
import { useForm } from '@/shared/ui-kit/forms/Form/hooks/useForm.ts';
import {
    useInputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';
import { userLoginUpdateEffect } from '@/app/model/auth/auth.model.ts';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import {
    InputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/ui/InputWithError.tsx';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { useTranslation } from 'react-i18next';
import {
    userAuthLoginValidator,
} from '@/app/validation/user/login.validators.ts';


export type UserLoginChangeFormProps =
    {
        login: string;
    }
    & ComponentPropsWithoutRef<'form'>;

export const UserLoginChangeForm: FC<UserLoginChangeFormProps> = memo(function UserLoginChangeForm (props) {
    const { login, className, ...other }    = props;
    const { t }                             = useTranslation([ 'user-settings' ]);
    const [ currentLogin, setCurrentLogin ] = useState<string>(login);
    const loginInput                        = useInputWithError({
        name            : 'login',
        onChangeHandler : setCurrentLogin,
        validationMethod: userAuthLoginValidator,
    });
    const form                              = useForm<{ login: string }>({
        inputs  : [ loginInput ],
        onSubmit: async (data) => userLoginUpdateEffect(data.login).then(),
    });

    const discardChanges = useCallback(() => {
        setCurrentLogin(login);
        loginInput.value.current          = login;
        loginInput.inputRef.current.value = login;
    }, [ login, loginInput.inputRef, loginInput.value ]);

    return (
        <Form
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            controller={ form }
        >
            <Col>
                <InputWithError
                    autoComplete="off"
                    controller={ loginInput }
                    defaultValue={ login }
                    label={ t('login_label') }
                    placeholder={ t('login_placeholder') }
                />
                <Row fullWidth spaceBetween>
                    <Button
                        disabled={ currentLogin === login }
                        onClick={ discardChanges }
                        type="button"
                    >
                        { t('discard_changes') }
                    </Button>
                    <ButtonWithLoading
                        disabled={ currentLogin === login || !form.canBeSubmitted }
                        loading={ form.pending }
                        type="submit"
                    >
                        { t('apply_changes') }
                    </ButtonWithLoading>
                </Row>
            </Col>
        </Form>
    );
});