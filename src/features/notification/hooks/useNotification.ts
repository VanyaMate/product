import {
    NotificationController,
} from '@/features/notification/services/controller/notification-controller.service.ts';
import {
    XhrNotificationConnector,
} from '@/features/notification/services/connector/xhr-notification-connector.service.ts';
import {
    SseNotificationParser,
} from '@/features/notification/services/parser/sse-notification-parser.service.ts';
import {
    INotificationController,
} from '@/features/notification/services/controller/notification-controller.interface.ts';
import {
    LOCAL_STORAGE_USER_ACCESS_TOKEN,
    LOCAL_STORAGE_USER_REFRESH_TOKEN,
} from '@/app/redux/slices/user/consts/storage.const.ts';
import { useEffect } from 'react';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import { tokenUpdate } from '@/features/notification/lib/tokenUpdate.ts';


const notificationController: INotificationController = new NotificationController(
    new XhrNotificationConnector(),
    new SseNotificationParser(),
);

notificationController.subscribe(DomainNotificationType.TOKENS_UPDATE, tokenUpdate);

const connections: Set<string> = new Set<string>();

export const useNotification = function (id: string): INotificationController {
    useEffect(() => {
        if (connections.size === 0) {
            notificationController.connect(`${ __API__ }/v1/notification`, () => ({
                accessToken : localStorage.getItem(LOCAL_STORAGE_USER_ACCESS_TOKEN),
                refreshToken: localStorage.getItem(LOCAL_STORAGE_USER_REFRESH_TOKEN),
                id          : '1',
            }));
        }
        connections.add(id);

        return () => {
            connections.delete(id);
            if (connections.size === 0) {
                notificationController.disconnect();
            }
        };
    }, [ id ]);

    return notificationController;
};