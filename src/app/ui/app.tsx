import { FC, memo, useEffect, useRef } from 'react';
import { AppProviders } from './app-providers.tsx';
import { AppContent } from './app-content.tsx';
import {
    INotificationService,
} from '@/shared/services/notification/notification-service.interface.ts';
import {
    AxiosNotificationService,
} from '@/shared/services/notification/axios-notification.service.ts';


export const App: FC = memo(function App () {
    const notif = useRef<INotificationService>(null);
    useEffect(() => {
        if (!notif.current) {
            notif.current = new AxiosNotificationService(__API__, 'v1/notification');
        }
    }, []);

    return (
        <AppProviders>
            <AppContent/>
        </AppProviders>
    );
});