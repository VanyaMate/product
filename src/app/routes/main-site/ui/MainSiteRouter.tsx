import { FC, memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { SiteAppRouteConfig } from '../config/routes';


export const MainSiteRouter: FC = memo(function MainSiteRouter (props) {
    const {} = props;

    return (
        <Routes>
            {
                Object.values(SiteAppRouteConfig).map((route) => (
                    <Route
                        element={ route.element }
                        key={ route.path }
                        path={ route.path }
                    />
                ))
            }
        </Routes>
    );
});