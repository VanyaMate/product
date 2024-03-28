import React from 'react';
import '@/app/styles/index.scss';
import { MainSiteApp } from '@/app/apps/MainSite';


export type RootAppProps = {};

const RootApp: React.FC<RootAppProps> = (props) => {
    const {} = props;

    return (
        <MainSiteApp/>
    );
};

export default React.memo(RootApp);