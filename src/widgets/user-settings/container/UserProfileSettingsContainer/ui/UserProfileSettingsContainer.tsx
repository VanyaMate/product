import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UserProfileSettingsContainer.module.scss';
import { useStore } from '@vanyamate/sec-react';
import { $authUser } from '@/app/model/auth/auth.model.ts';
import {
    UserSettingsSection,
} from '@/entities/user-settings/UserSettingsSection/ui/UserSettingsSection.tsx';
import {
    UserAvatarChangeForm,
} from '@/widgets/user-settings/form/UserAvatarChangeForm/ui/UserAvatarChangeForm.tsx';
import {
    UserLoginChangeForm,
} from '@/widgets/user-settings/form/UseLoginChangeForm/ui/UserLoginChangeForm.tsx';
import {
    UserPasswordChangeForm,
} from '@/widgets/user-settings/form/UserPasswordChangeForm/ui/UserPasswordChangeForm.tsx';
import {
    UserProfileBackgroundChangeForm,
} from '@/widgets/user-settings/form/UserProfileBackgroundChangeForm/ui/UserProfileBackgroundChangeForm.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type UserProfileSettingsContainerProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const UserProfileSettingsContainer: FC<UserProfileSettingsContainerProps> = memo(function UserProfileSettingsContainer (props) {
    const { className, ...other } = props;
    const user                    = useStore($authUser);
    const { t }                   = useTranslation();

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            <UserSettingsSection
                title={ t.page.userSettings.avatar_change_form_title }>
                <UserAvatarChangeForm
                    avatar={ user.avatar }
                    login={ user.login }
                />
            </UserSettingsSection>
            <UserSettingsSection
                title={ t.page.userSettings.login_change_form_title }>
                <UserLoginChangeForm login={ user.login }/>
            </UserSettingsSection>
            <UserSettingsSection title={ t.page.userSettings.password_title }>
                <UserPasswordChangeForm/>
            </UserSettingsSection>
            <UserSettingsSection title={ t.page.userSettings.background_title }>
                <UserProfileBackgroundChangeForm
                    background={ user.background }
                />
            </UserSettingsSection>
        </div>
    );
});