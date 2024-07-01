import { FC, memo, Suspense } from 'react';
import '../styles';
import {
    ScreenHeight,
} from '@/shared/ui-kit/screen/ScreenHeight/ui/ScreenHeight';
import {
    SiteMainLayout,
} from '@/shared/layout/site/SiteMainLayout/ui/SiteMainLayout.tsx';
import {
    HeaderNavBar,
} from '@/widgets/site/navigation/HeaderNavBar/ui/HeaderNavBar.tsx';
import {
    SiteNavigationMenu,
} from '@/widgets/site/navigation/SiteNavigationMenu/ui/SiteNavigationMenu/SiteNavigationMenu.tsx';
import { MainSiteRouter } from '@/app/routes/main-site/ui/MainSiteRouter.tsx';
import { WelcomePage } from '@/pages/WelcomePage/ui/WelcomePage.tsx';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import {
    UserRightSideMenu,
} from '@/widgets/user/menu/UserRightSideMenu/ui/UserRightSideMenu.tsx';
import { useStore } from '@vanyamate/sec-react';
import { $authUser } from '@/app/model/auth/auth.model.ts';


export type AppProps = {};

export const AppContent: FC<AppProps> = memo(function App (props) {
    const {}   = props;
    const user = useStore($authUser);

    if (user === null) {
        return <WelcomePage/>;
    }

    return (
        <Suspense fallback={ <PageLoader/> }>
            <ScreenHeight>
                <SiteMainLayout
                    header={ <HeaderNavBar/> }
                    leftSideMenu={ <SiteNavigationMenu/> }
                    rightSideMenu={ <UserRightSideMenu/> }
                >
                    <MainSiteRouter/>
                </SiteMainLayout>
            </ScreenHeight>
        </Suspense>
    );
});