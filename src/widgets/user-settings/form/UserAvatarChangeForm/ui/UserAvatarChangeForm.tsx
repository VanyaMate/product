import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useCallback,
    useMemo,
    useState,
} from 'react';
import css from './UserAvatarChangeForm.module.scss';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    UserAvatar,
} from '@/entities/user/avatar/UserAvatar/ui/UserAvatar.tsx';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { userAvatarUpdateEffect } from '@/app/model/auth/auth.model.ts';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';
import {
    isUserAvatarUrlValidatorRhf,
} from '@/app/react-hook-form/validator/isUserAvatarUrlValidatorRhf/isUserAvatarUrlValidatorRhf.ts';


type AvatarChangeData = { avatar: string };

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

    const {
              handleSubmit, formState, reset, register,
          }        = useForm<AvatarChangeData>({
        values: { avatar },
        mode  : 'onChange',
    });
    const onSubmit = useCallback((data: AvatarChangeData) => {
        return userAvatarUpdateEffect(data.avatar);
    }, []);

    const disableButton = useMemo(() => {
        return !formState.isValid || currentAvatar === avatar;
    }, [ avatar, currentAvatar, formState.isValid ]);

    const submitting = useMemo(() => {
        return formState.isSubmitting;
    }, [ formState.isSubmitting ]);

    const discard = useCallback(() => {
        reset();
        setCurrentAvatar(avatar);
    }, [ avatar, reset ]);

    return (
        <form
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            onSubmit={ handleSubmit(onSubmit) }
        >
            <TextInput
                autoComplete="off"
                errorMessage={ formState.errors.avatar?.message }
                label={ t.page.userSettings.link_to_avatar }
                placeholder={ t.page.userSettings.insert_link_to_avatar }
                type="text"
                { ...register('avatar', {
                    onChange: ({ target: { value } }) => setCurrentAvatar(value),
                    validate: isUserAvatarUrlValidatorRhf,
                }) }
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
        </form>
    );
});