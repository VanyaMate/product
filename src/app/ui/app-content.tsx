import { FC, memo } from 'react';
import {
    MainSiteRouter,
} from '@/app';
import { ScreenHeight } from '@/shared/ui-kit';
import { Toaster } from '@/shared/ui-shad';
import '../styles';
import { HeaderNavBar } from '@/widgets/site';
import {
    NavigationMenu,
} from '@/widgets/site';


export type AppProps = {};

export const AppContent: FC<AppProps> = memo(function App (props) {
    const {} = props;

    return (
        <ScreenHeight>
            <NavigationMenu
                header={ <HeaderNavBar/> }
                sideMenu="side menu"
            >
                <MainSiteRouter/>
            </NavigationMenu>
            <Toaster/>
        </ScreenHeight>
    );
});