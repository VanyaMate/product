import React from 'react';
import ThemeProvider
    from '@/components/contexts/theme/ThemeContext/providers/ThemeProvider.tsx';
import WindowHeight from '@/components/shared/page/WindowHeight/WindowHeight.tsx';


export type SiteAppProps = {};

const SiteApp: React.FC<SiteAppProps> = (props) => {
    const {} = props;

    return (
        <React.StrictMode>
            <ThemeProvider withStorage={ true } storageId={ 'site-app' }>
                <WindowHeight>
                    <h1>Content</h1>
                </WindowHeight>
            </ThemeProvider>
        </React.StrictMode>
    );
};

export default React.memo(SiteApp);