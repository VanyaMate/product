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


export type UserProfileSettingsContainerProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const UserProfileSettingsContainer: FC<UserProfileSettingsContainerProps> = memo(function UserProfileSettingsContainer (props) {
    const { className, ...other } = props;
    const user                    = useStore($authUser);

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            <UserSettingsSection className={ css.section } title="Аватар">
                <UserAvatarChangeForm
                    avatar={ user.avatar }
                    login={ user.login }
                />
            </UserSettingsSection>
        </div>
    );
});