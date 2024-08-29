import { FC, memo } from 'react';
import {
    ScreenHeight,
} from '@/shared/ui-kit/screen/ScreenHeight/ui/ScreenHeight.tsx';
import {
    SiteMainLayout,
} from '@/shared/layout/site/SiteMainLayout/ui/SiteMainLayout.tsx';
import {
    HeaderNavBar,
} from '@/widgets/site/navigation/HeaderNavBar/ui/HeaderNavBar.tsx';
import {
    SiteNavigationMenu,
} from '@/widgets/site/navigation/SiteNavigationMenu/ui/SiteNavigationMenu/SiteNavigationMenu.tsx';
import {
    UserRightSideMenu,
} from '@/widgets/user/menu/UserRightSideMenu/ui/UserRightSideMenu.tsx';
import { MainSiteRouter } from '@/app/routes/main-site/ui/MainSiteRouter.tsx';
import { CallModal } from '@/widgets/call/CallModal/ui/CallModal.tsx';
import { BrowserRouter } from 'react-router-dom';
import {
    ErrorBoundary,
} from '@/shared/ui-kit/errors/ErrorBoundary/ui/ErrorBoundary.tsx';


export const AppAuthContentAsync: FC = memo(function AppAuthContentAsync () {
    return (
        <ScreenHeight>
            <BrowserRouter>
                <SiteMainLayout
                    header={ <HeaderNavBar/> }
                    leftSideMenu={ <SiteNavigationMenu/> }
                    rightSideMenu={ <UserRightSideMenu/> }
                >
                    <ErrorBoundary>
                        <MainSiteRouter/>
                    </ErrorBoundary>
                </SiteMainLayout>
                <CallModal/>
            </BrowserRouter>
        </ScreenHeight>
    );
});