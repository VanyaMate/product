import { FC, memo, useMemo } from 'react';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type NotificationTitleProps = {
    type: DomainNotificationType;
};

export const NotificationTitle: FC<NotificationTitleProps> = memo(function NotificationTitle (props) {
    const { type } = props;
    const { t }    = useTranslation();
    return useMemo(() => t.notifications.title[type as keyof typeof t.notifications.title] ?? t.notifications.title.unk, [ t, type ]);
});