import { createRoot } from 'react-dom/client';
import { App } from '@/app/ui/app.tsx';
import {
    NotificationController,
} from '@/shared/services/notification/controller/notification-controller.service.ts';
import {
    XhrNotificationConnector,
} from '@/shared/services/notification/connector/xhr-notification-connector.service.ts';
import {
    LOCAL_STORAGE_USER_ACCESS_TOKEN,
    LOCAL_STORAGE_USER_REFRESH_TOKEN,
} from '@/app/redux/slices/user/consts/storage.const.ts';
import {
    SseNotificationParser,
} from '@/shared/services/notification/parser/sse-notification-parser.service.ts';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';


const notificationConnector = new NotificationController(
    new XhrNotificationConnector(),
    new SseNotificationParser(),
);

document.addEventListener('DOMContentLoaded', () => {
    notificationConnector.connect(`${ __API__ }/v1/notification`, () => ({
        accessToken : localStorage.getItem(LOCAL_STORAGE_USER_ACCESS_TOKEN),
        refreshToken: localStorage.getItem(LOCAL_STORAGE_USER_REFRESH_TOKEN),
        id          : '1',
    }));
});

notificationConnector.subscribe(DomainNotificationType.TOKENS_UPDATE, (notifications) => {
    notifications.forEach((notification) => {
        console.log(notification.data);
        localStorage.setItem(LOCAL_STORAGE_USER_ACCESS_TOKEN, notification.data[0]);
        localStorage.setItem(LOCAL_STORAGE_USER_REFRESH_TOKEN, notification.data[1]);
    });
});

// setTimeout(() => notificationConnector.disconnect(), 5000);


const rootElement: HTMLElement | null = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(<App/>);
}
