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
import { Toaster } from '@/shared/ui-shad/ui/sonner.tsx';
import { MainSiteRouter } from '@/app/routes/main-site/ui/MainSiteRouter.tsx';
import { useAppSelector } from '@/app/redux/hooks/useAppSelector.ts';
import {
    getAuthUser,
} from '@/app/redux/slices/auth/selectors/getAuthUser/getAuthUser.ts';
import { WelcomePage } from '@/pages/WelcomePage/ui/WelcomePage.tsx';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import {
    UserRightSideMenu,
} from '@/widgets/user/menu/UserRightSideMenu/ui/UserRightSideMenu.tsx';


export type AppProps = {};

export const AppContent: FC<AppProps> = memo(function App (props) {
    const {}   = props;
    const user = useAppSelector(getAuthUser);

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
                <Toaster/>
            </ScreenHeight>
        </Suspense>
    );
});