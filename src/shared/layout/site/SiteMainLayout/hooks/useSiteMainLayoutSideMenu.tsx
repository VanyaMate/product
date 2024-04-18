import {
    SiteMainLayoutSideMenuContext,
    SiteMainLayoutSideMenuContextProps,
} from '../context/SiteMainLayoutSideMenuContext.ts';
import { useContext } from 'react';


export const useSiteMainLayoutSideMenu = function (): SiteMainLayoutSideMenuContextProps {
    return useContext(SiteMainLayoutSideMenuContext);
};