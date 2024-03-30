import React from 'react';
import SiteApp from '@/apps/SiteApp/SiteApp.tsx';
import ErrorBoundary from '@/components/shared/ui/errors/ErrorBoundary/ErrorBoundary.tsx';


export type RootAppProps = {};

const RootApp: React.FC<RootAppProps> = (props) => {
    const {} = props;

    return (
        <React.StrictMode>
            <ErrorBoundary>
                <SiteApp/>
            </ErrorBoundary>
        </React.StrictMode>
    );
};

export default React.memo(RootApp);