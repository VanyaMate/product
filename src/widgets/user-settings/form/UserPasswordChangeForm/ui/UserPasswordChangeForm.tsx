import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useCallback,
    useState,
} from 'react';
import classNames from 'classnames';
import css from './UserPasswordChangeForm.module.scss';
import {
    useInputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';
import { useForm } from '@/shared/ui-kit/forms/Form/hooks/useForm.ts';
import { Form } from '@/shared/ui-kit/forms/Form/ui/Form.tsx';
import {
    InputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/ui/InputWithError.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { useTranslation } from 'react-i18next';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import {
    passwordEqualValidator,
} from '@/app/validation/password/password-equal.validator.ts';
import { userPasswordUpdateEffect } from '@/app/model/auth/auth.model.ts';


export type UserPasswordChangeFormProps =
    {}
    & ComponentPropsWithoutRef<'form'>;

export const UserPasswordChangeForm: FC<UserPasswordChangeFormProps> = memo(function UserPasswordChangeForm (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation([ 'user-settings' ]);
    const [ isEmpty, setIsEmpty ] = useState<boolean>(true);

    const firstPasswordInput  = useInputWithError({
        name            : 'pass1',
        validationMethod: (value) => passwordEqualValidator(value, secondPasswordInput.value.current),
        onChangeHandler : (value) => setIsEmpty(!value.length && !secondPasswordInput.value.current.length),
    });
    const secondPasswordInput = useInputWithError({
        name            : 'pass2',
        validationMethod: (value) => passwordEqualValidator(value, firstPasswordInput.value.current),
        onChangeHandler : (value) => setIsEmpty(!value.length && !firstPasswordInput.value.current.length),
    });

    const form = useForm<{ pass1: string, pass2: string }>({
        inputs  : [ firstPasswordInput, secondPasswordInput ],
        onSubmit: async (data) => userPasswordUpdateEffect(data.pass1).then(discard),
    });

    const discard = useCallback(() => {
        setIsEmpty(true);
        firstPasswordInput.value.current           = '';
        firstPasswordInput.inputRef.current.value  = '';
        secondPasswordInput.value.current          = '';
        secondPasswordInput.inputRef.current.value = '';
    }, [ firstPasswordInput.inputRef, firstPasswordInput.value, secondPasswordInput.inputRef, secondPasswordInput.value ]);

    return (
        <Form
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            controller={ form }
        >
            <Col>
                <InputWithError
                    controller={ firstPasswordInput }
                    label={ t('password_label') }
                    placeholder={ t('password_placeholder') }
                    type="password"
                />
                <InputWithError
                    controller={ secondPasswordInput }
                    label={ t('second_password_label') }
                    placeholder={ t('password_placeholder') }
                    type="password"
                />
                <Row fullWidth spaceBetween>
                    <Button
                        disabled={ isEmpty }
                        onClick={ discard }
                        type="button"
                    >
                        { t('discard_changes') }
                    </Button>
                    <ButtonWithLoading
                        disabled={ !form.canBeSubmitted }
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