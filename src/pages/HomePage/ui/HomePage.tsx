import { FC, memo } from 'react';
import {
    UserContainer,
} from '@/widgets/user/containers/UserContainer/ui/UserContainer.tsx';
import { useStore } from '@vanyamate/sec-react';
import { $authUser } from '@/app/model/auth/auth.model.ts';


export type HomePageContentProps = {};

const HomePage: FC<HomePageContentProps> = (props) => {
    const {}       = props;
    const userData = useStore($authUser);

    return (
        <UserContainer login={ userData.login }/>
    );
};

export default memo(HomePage);