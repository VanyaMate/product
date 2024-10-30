import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useCallback,
    useMemo,
    useState,
} from 'react';
import classNames from 'classnames';
import css from './UserProfileBackgroundChangeForm.module.scss';
import {
    userBackgroundUpdateEffect,
} from '@/app/model/auth/auth.model.ts';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import {
    UserSettingsNoSetBackground,
} from '@/entities/user-settings/UserSettingsNoSetBackground/ui/UserSettingsNoSetBackground.tsx';
import {
    ImageBackground,
} from '@/shared/ui-kit/image/ImageBackground/ui/ImageBackground.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { useForm } from 'react-hook-form';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';
import {
    isUserBackgroundUrlValidatorRhf,
} from '@/app/react-hook-form/validator/isUserBackgroundUrlValidatorRhf/isUserBackgroundUrlValidatorRhf.ts';


type UserProfileBackgroundChangeType = {
    background: string
};

export type UserProfileBackgroundChangeFormProps =
    {
        background: string | null;
    }
    & ComponentPropsWithoutRef<'form'>;

export const UserProfileBackgroundChangeForm: FC<UserProfileBackgroundChangeFormProps> = memo(function UserProfileBackgroundChangeForm (props) {
    const { background, className, ...other }         = props;
    const { t }                                       = useTranslation();
    const [ currentBackground, setCurrentBackground ] = useState<string>(background ?? '');
    const {
              handleSubmit,
              formState,
              reset,
              register,
          }                                           = useForm<UserProfileBackgroundChangeType>({
        mode  : 'onChange',
        values: { background },
    });

    const disableButton = useMemo(() => {
        return !formState.isValid || background === currentBackground;
    }, [ background, currentBackground, formState.isValid ]);

    const submitting = useMemo(() => {
        return formState.isSubmitting;
    }, [ formState.isSubmitting ]);

    const discard = useCallback(() => {
        reset();
        setCurrentBackground(background);
    }, [ background, reset ]);

    const onSubmit = useCallback((data: UserProfileBackgroundChangeType) => {
        return userBackgroundUpdateEffect(data.background);
    }, []);

    return (
        <form
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            onSubmit={ handleSubmit(onSubmit) }
        >
            <TextInput
                autoComplete="off"
                errorMessage={ formState.errors.background?.message }
                label={ t.page.userSettings.background_label }
                placeholder={ t.page.userSettings.background_placeholder }
                type="text"
                { ...register('background', {
                    validate: isUserBackgroundUrlValidatorRhf,
                    onChange: ({ target: { value } }) => setCurrentBackground(value),
                }) }
            />
            {
                currentBackground === ''
                ? <UserSettingsNoSetBackground/>
                : <ImageBackground
                    alt="background"
                    className={ css.background }
                    src={ currentBackground }
                />
            }
            <Row
                fullWidth
                key="buttons"
                spaceBetween
            >
                <Button
                    disabled={ background === currentBackground }
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