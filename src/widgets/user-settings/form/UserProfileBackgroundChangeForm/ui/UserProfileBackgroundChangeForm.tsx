import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useCallback,
    useState,
} from 'react';
import classNames from 'classnames';
import css from './UserProfileBackgroundChangeForm.module.scss';
import { useTranslation } from 'react-i18next';
import {
    useInputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';
import { useForm } from '@/shared/ui-kit/forms/Form/hooks/useForm.ts';
import {
    userBackgroundUpdateEffect,
} from '@/app/model/auth/auth.model.ts';
import { Form } from '@/shared/ui-kit/forms/Form/ui/Form.tsx';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import {
    InputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/ui/InputWithError.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import {
    imageUrlValidator,
} from '@/app/validation/image/image-url.validator.ts';
import {
    UserSettingsNoSetBackground,
} from '@/entities/user-settings/UserSettingsNoSetBackground/ui/UserSettingsNoSetBackground.tsx';
import {
    ImageBackground,
} from '@/shared/ui-kit/image/ImageBackground/ui/ImageBackground.tsx';


export type UserProfileBackgroundChangeFormProps =
    {
        background: string | null;
    }
    & ComponentPropsWithoutRef<'form'>;

export const UserProfileBackgroundChangeForm: FC<UserProfileBackgroundChangeFormProps> = memo(function UserProfileBackgroundChangeForm (props) {
    const { background, className, ...other }         = props;
    const { t }                                       = useTranslation([ 'user-settings' ]);
    const [ currentBackground, setCurrentBackground ] = useState<string>(background ?? '');
    const backgroundInput                             = useInputWithError({
        name            : 'background',
        onChangeHandler : setCurrentBackground,
        validationMethod: imageUrlValidator,
    });
    const form                                        = useForm<{
        background: string
    }>({
        inputs  : [ backgroundInput ],
        onSubmit: async (data) => userBackgroundUpdateEffect(data.background).then(),
    });

    const discardChanges = useCallback(() => {
        setCurrentBackground(currentBackground);
        backgroundInput.value.current          = currentBackground;
        backgroundInput.inputRef.current.value = currentBackground;
    }, [ currentBackground, backgroundInput.inputRef, backgroundInput.value ]);

    return (
        <Form
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            controller={ form }
        >
            <Col>
                <InputWithError
                    autoComplete="off"
                    controller={ backgroundInput }
                    defaultValue={ currentBackground }
                    key="input"
                    label={ t('background_label') }
                    placeholder={ t('background_placeholder') }
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
                        disabled={ currentBackground === background }
                        onClick={ discardChanges }
                        type="button"
                    >
                        { t('discard_changes') }
                    </Button>
                    <ButtonWithLoading
                        disabled={ currentBackground === background || !form.canBeSubmitted }
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