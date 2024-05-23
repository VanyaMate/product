import {
    DomainNotification,
} from 'product-types/dist/notification/DomainNotification';
import {
    LOCAL_STORAGE_USER_ACCESS_TOKEN, LOCAL_STORAGE_USER_REFRESH_TOKEN,
} from '@/app/redux/slices/user/consts/storage.const.ts';
import {
    NotificationNotificatorCallback,
} from '@/features/notification/services/notificator/notification-notificator.interface.ts';
import {
    isDomainNotificationTokensUpdateData,
} from 'product-types/dist/notification/notification-data-types/DomainNotificationTokensUpdateData';


export const tokenUpdate: NotificationNotificatorCallback = function ([ notification ]: [ DomainNotification ]) {
    if (__IS_DEV__) {
        console.log('NOTIFICATION: TokensUpdate', notification);
    }

    if (isDomainNotificationTokensUpdateData(notification.data)) {
        localStorage.setItem(LOCAL_STORAGE_USER_ACCESS_TOKEN, notification.data[0]);
        localStorage.setItem(LOCAL_STORAGE_USER_REFRESH_TOKEN, notification.data[1]);
    }
};