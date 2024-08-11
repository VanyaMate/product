import { ComponentPropsWithoutRef, FC, memo } from 'react';
import {
    UserSettingsContainer,
} from '@/widgets/user-settings/container/UserSettingsContainer/ui/UserSettingsContainer.tsx';


export type UserSettingsPageProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const UserSettingsPage: FC<UserSettingsPageProps> = memo(function UserSettingsPage (props) {
    return (
        <UserSettingsContainer { ...props }/>
    );
});