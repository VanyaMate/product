import { FC, memo } from 'react';
import {
    GlobalNotifications,
} from '@/widgets/notification/GlobalNotifications/ui/GlobalNotifications.tsx';


export type HomePageContentProps = {};

const HomePage: FC<HomePageContentProps> = (props) => {
    const {} = props;

    return (
        <GlobalNotifications/>
    );
};

export default memo(HomePage);