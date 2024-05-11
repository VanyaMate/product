import { createRoot } from 'react-dom/client';
import { App } from '@/app/ui/app.tsx';
import {
    NotificationControllerService,
} from '@/shared/services/notification/controller/notification-controller.service.ts';
import {
    XhrNotificationConnectorService,
} from '@/shared/services/notification/connector/xhr-notification-connector.service.ts';
import {
    LOCAL_STORAGE_USER_ACCESS_TOKEN, LOCAL_STORAGE_USER_REFRESH_TOKEN,
} from '@/app/redux/slices/user/consts/storage.const.ts';


const notificationConnector = new NotificationControllerService(new XhrNotificationConnectorService());
notificationConnector.connect(`${ __API__ }/v1/notification`, () => ({
    accessToken : localStorage.getItem(LOCAL_STORAGE_USER_ACCESS_TOKEN),
    refreshToken: localStorage.getItem(LOCAL_STORAGE_USER_REFRESH_TOKEN),
    id          : '1',
}));

// setTimeout(() => notificationConnector.disconnect(), 5000);


const rootElement: HTMLElement | null = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(<App/>);
}
