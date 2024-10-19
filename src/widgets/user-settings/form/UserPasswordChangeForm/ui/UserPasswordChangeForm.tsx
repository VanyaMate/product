import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useCallback,
    useMemo,
} from 'react';
import classNames from 'classnames';
import css from './UserPasswordChangeForm.module.scss';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { userPasswordUpdateEffect } from '@/app/model/auth/auth.model.ts';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { useForm } from 'react-hook-form';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';
import {
    passwordEqualValidator,
} from '@/app/validation/password/password-equal.validator.ts';


type PasswordChangeType = {
    firstPassword: string;
    secondPassword: string;
}

export type UserPasswordChangeFormProps =
    {}
    & ComponentPropsWithoutRef<'form'>;

export const UserPasswordChangeForm: FC<UserPasswordChangeFormProps> = memo(function UserPasswordChangeForm (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation();

    const {
              handleSubmit,
              register,
              formState,
              reset,
              getValues,
          }        = useForm<PasswordChangeType>({
        mode: 'onChange',
    });
    const onSubmit = useCallback((data: PasswordChangeType) => {
        return userPasswordUpdateEffect(data.firstPassword);
    }, []);

    const disableButton = useMemo(() => {
        return !formState.isValid;
    }, [ formState.isValid ]);

    const submitting = useMemo(() => {
        return formState.isSubmitting;
    }, [ formState.isSubmitting ]);

    const discard = useCallback(() => {
        reset();
    }, [ reset ]);

    const validate = useCallback(() => {
        const values = getValues();
        const error  = passwordEqualValidator(values.firstPassword, values.secondPassword);
        return error ? error : true;
    }, [ getValues ]);

    return (
        <form
            { ...other }
            aria-autocomplete="none"
            autoComplete="off"
            className={ classNames(css.container, {}, [ className ]) }
            onSubmit={ handleSubmit(onSubmit) }
        >
            <TextInput
                errorMessage={ formState.errors.firstPassword?.message }
                label={ t.page.userSettings.password_label }
                placeholder={ t.page.userSettings.password_placeholder }
                required
                type="password"
                { ...register('firstPassword', {
                    required: true,
                    validate,
                    deps    : [ 'secondPassword' ],
                }) }
            />
            <TextInput
                errorMessage={ formState.errors.secondPassword?.message }
                label={ t.page.userSettings.second_password_label }
                placeholder={ t.page.userSettings.password_placeholder }
                required
                type="password"
                { ...register('secondPassword', {
                    required: true,
                    validate,
                    deps    : [ 'firstPassword' ],
                }) }
            />
            <Row fullWidth spaceBetween>
                <Button
                    disabled={ disableButton || submitting }
                    onClick={ discard }
                    type="button"
                >
                    { t.page.userSettings.discard_changes }
                </Button>
                <ButtonWithLoading
                    disabled={ disableButton }
                    loading={ submitting }
                    type="submit"
                >
                    { t.page.userSettings.apply_changes }
                </ButtonWithLoading>
            </Row>
        </form>
    );
});