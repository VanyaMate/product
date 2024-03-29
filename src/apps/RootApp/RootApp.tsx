import React from 'react';
import SiteApp from '@/apps/SiteApp/SiteApp.tsx';


export type RootAppProps = {};

const RootApp: React.FC<RootAppProps> = (props) => {
    const {} = props;

    return (
        <React.StrictMode>
            <SiteApp/>
        </React.StrictMode>
    );
};

export default React.memo(RootApp);