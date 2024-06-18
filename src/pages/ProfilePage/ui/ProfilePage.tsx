import { FC, memo } from 'react';
import { useParams } from 'react-router-dom';
import {
    UserContainer,
} from '@/widgets/user/containers/UserContainer/ui/UserContainer.tsx';


export type ProfilePageProps = {};

export const ProfilePage: FC<ProfilePageProps> = memo(function ProfilePage (props) {
    const {}        = props;
    const { login } = useParams<{ login: string }>();

    return (
        <UserContainer login={ login }/>
    );
});