import { FC, memo } from 'react';
import { AppProviders } from './app-providers.tsx';
import { AppContent } from './app-content.tsx';


export const App: FC = memo(function App () {
    return (
        <AppProviders>
            <AppContent/>
        </AppProviders>
    );
});