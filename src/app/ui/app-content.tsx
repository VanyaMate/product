import { FC, memo } from 'react';
import '../styles';
import { ScreenHeight } from '@/shared/ui-kit/screen/ScreenHeight/ui/ScreenHeight';
import {
    SiteMainLayout
} from '@/shared/layout/site/SiteMainLayout/ui/SiteMainLayout.tsx';
import { HeaderNavBar } from '@/widgets/site/navigation/HeaderNavBar/ui/HeaderNavBar.tsx';
import {
    SiteNavigationMenu
} from '@/widgets/site/navigation/SiteNavigationMenu/ui/SiteNavigationMenu/SiteNavigationMenu.tsx';
import { Toaster } from '@/shared/ui-shad/ui/sonner.tsx';
import { MainSiteRouter } from '@/app/routes/main-site/ui/MainSiteRouter.tsx';


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