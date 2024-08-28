import { FC, lazy, memo, Suspense } from 'react';
import '../styles';
import { WelcomePage } from '@/pages/WelcomePage/ui/WelcomePage.tsx';
import { useStore } from '@vanyamate/sec-react';
import { $authUser } from '@/app/model/auth/auth.model.ts';
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';


const AppAuthContentAsync = lazy(() => import('@/app/ui/app-auth-content.async').then((component) => ({
    default: component.AppAuthContentAsync,
})));


export type AppProps = {};

export const AppContent: FC<AppProps> = memo(function App (props) {
    const {}   = props;
    const user = useStore($authUser);

    if (user === null) {
        return <WelcomePage/>;
    }

    return (
        <Suspense fallback={ <PageLoader/> }>
            <AppAuthContentAsync/>
        </Suspense>
    );
});