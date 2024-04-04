import React from 'react';
import { Provider } from 'react-redux';
import {
    createSiteAppReduxStore,
} from '@/apps/SiteApp/configs/redux-tollkit/site-app.rtk-store-config.ts';


export type SiteAppReduxToolkitProviderProps = {
    children: React.ReactNode;
};

const SiteAppReduxToolkitProvider: React.FC<SiteAppReduxToolkitProviderProps> = (props) => {
    const { children } = props;
    const store        = createSiteAppReduxStore();

    return (
        <Provider store={ store }>
            { children }
        </Provider>
    );
};

export default React.memo(SiteAppReduxToolkitProvider);