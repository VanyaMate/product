import { FC, memo } from 'react';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import { useTranslation } from 'react-i18next';


export type NotificationTitleProps = {
    type: DomainNotificationType;
};

export const NotificationTitle: FC<NotificationTitleProps> = memo(function NotificationTitle (props) {
    const { type } = props;
    const { t }    = useTranslation('notification-messages');
    return t(type, { ns: 'notification-messages' });
});