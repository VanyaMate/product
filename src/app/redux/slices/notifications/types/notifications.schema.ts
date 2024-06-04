import { ThunkState } from '@/app/redux/types/thunkError.ts';
import {
    DomainNotification, DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';


export type NotificationsSettingsItem = {
    sound: boolean;
    mark: boolean;
}

export type NotificationsSettings = Record<DomainNotificationType, NotificationsSettingsItem>;

export type NotificationsSchema = ThunkState & {
    notifications: DomainNotification[];
    settings: NotificationsSettings;
}