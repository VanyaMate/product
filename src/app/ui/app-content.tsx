import { FC, memo } from 'react';
import {
    MainSiteRouter,
} from '@/app';
import { ScreenHeight } from '@/shared/ui-kit';
import { Toaster } from '@/shared/ui-shad';
import '../styles';
import { HeaderNavBar, SiteNavigationMenu } from '@/widgets/site';
import { SiteMainLayout } from '@/shared/layout';


export type AppProps = {};

export const AppContent: FC<AppProps> = memo(function App (props) {
    const {} = props;

    return (
        <ScreenHeight>
            <SiteMainLayout
                header={ <HeaderNavBar/> }
                sideMenu={ <SiteNavigationMenu/> }
            >
                <MainSiteRouter/>
            </SiteMainLayout>
            <Toaster/>
        </ScreenHeight>
    );
});