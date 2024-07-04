import { lazy } from 'react';


export const GlobalNotificationsAsync = lazy(() => import('./GlobalNotifications.tsx').then((data) => ({
    default: data.GlobalNotifications,
})));