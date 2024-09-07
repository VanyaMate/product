import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useCallback,
    useState,
} from 'react';
import css from './UserAvatarChangeForm.module.scss';
import {
    InputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/ui/InputWithError.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    UserAvatar,
} from '@/entities/user/avatar/UserAvatar/ui/UserAvatar.tsx';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import {
    useInputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';
import {
    imageUrlValidator,
} from '@/app/validation/image/image-url.validator.ts';
import { useForm } from '@/shared/ui-kit/forms/Form/hooks/useForm.ts';
import { Form } from '@/shared/ui-kit/forms/Form/ui/Form.tsx';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { userAvatarUpdateEffect } from '@/app/model/auth/auth.model.ts';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type UserAvatarChangeFormProps =
    {
        avatar: string;
        login: string;
    }
    & ComponentPropsWithoutRef<'form'>;

export const UserAvatarChangeForm: FC<UserAvatarChangeFormProps> = memo(function UserAvatarChangeForm (props) {
    const { avatar, login, className, ...other } = props;
    const [ currentAvatar, setCurrentAvatar ]    = useState<string>(avatar);
    const { t }                                  = useTranslation();
    const avatarInput                            = useInputWithError({
        name            : 'avatar',
        validationMethod: (value) => value.length ? imageUrlValidator(value)
                                                  : '',
        onChangeHandler : setCurrentAvatar,
    });

    const form = useForm<{ avatar: string }>({
        inputs  : [ avatarInput ],
        onSubmit: async (data) => userAvatarUpdateEffect(data.avatar).then(),
    });

    const discardChanges = useCallback(() => {
        setCurrentAvatar(avatar);
        avatarInput.value.current          = avatar;
        avatarInput.inputRef.current.value = avatar;
    }, [ avatar, avatarInput.inputRef, avatarInput.value ]);

    return (
        <Form { ...other } className={ className } controller={ form }>
            <Col className={ css.container }>
                <InputWithError
                    autoComplete="off"
                    controller={ avatarInput }
                    defaultValue={ avatar }
                    label={ t.page.userSettings.link_to_avatar }
                    placeholder={ t.page.userSettings.insert_link_to_avatar }
                />
                <Row className={ css.avatarImagesCol }>
                    <UserAvatar
                        avatar={ currentAvatar }
                        className={ css.avatarLarge }
                        login={ login }
                    />
                    <Col>
                        <UserAvatar
                            avatar={ currentAvatar }
                            className={ css.avatarMedium }
                            login={ login }
                        />

                        <UserAvatar
                            avatar={ currentAvatar }
                            className={ css.avatarSmall }
                            login={ login }
                        />
                        <UserAvatar
                            avatar={ currentAvatar }
                            className={ css.avatarExtraSmall }
                            login={ login }
                        />
                    </Col>
                </Row>
                <Row fullWidth spaceBetween>
                    <Button
                        aria-label={ t.page.userSettings.discard_changes }
                        disabled={ currentAvatar === avatar }
                        onClick={ discardChanges }
                        styleType={ ButtonStyleType.GHOST }
                    >
                        { t.page.userSettings.discard_changes }
                    </Button>
                    <ButtonWithLoading
                        aria-label={ t.page.userSettings.apply_changes }
                        disabled={ currentAvatar === avatar }
                        loading={ form.pending }
                        type="submit"
                    >
                        { t.page.userSettings.apply_changes }
                    </ButtonWithLoading>
                </Row>
            </Col>
        </Form>
    );
});