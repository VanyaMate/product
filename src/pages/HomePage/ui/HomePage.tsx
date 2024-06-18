import { FC, memo } from 'react';
import {
    UserContainer,
} from '@/widgets/user/containers/UserContainer/ui/UserContainer.tsx';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import {
    getAuthUser,
} from '@/app/redux/slices/auth/selectors/getAuthUser/getAuthUser.ts';


export type HomePageContentProps = {};

const HomePage: FC<HomePageContentProps> = (props) => {
    const {}       = props;
    const userData = useAppSelector(getAuthUser);

    return (
        <UserContainer login={ userData.login }/>
    );
};

export default memo(HomePage);