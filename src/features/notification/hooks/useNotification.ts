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
import { useEffect } from 'react';
import {
    DomainNotification,
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import { tokenUpdate } from '@/features/notification/lib/tokenUpdate.ts';
import {
    LOCAL_STORAGE_USER_ACCESS_TOKEN,
    LOCAL_STORAGE_USER_REFRESH_TOKEN,
} from '@/app/model/auth/const.ts';
import {
    getConnectionId,
} from '@/features/connectionId/lib/getConnectionId/getConnectionId.ts';
import {
    BroadcastTabHierarchyService,
} from '@/app/services/tab-hierarchy/broadcast-tab-hierarchy.service.ts';


const notificationController: INotificationController = new NotificationController(
    new XhrNotificationConnector(),
    new SseNotificationParser(),
);

const multitab                         = new BroadcastTabHierarchyService();
let multitabOnMessageUnSub: () => void = () => {
};


notificationController.subscribe(DomainNotificationType.TOKENS_UPDATE, tokenUpdate);

const connections: Set<string> = new Set<string>();

export const useNotification = function (id: string): INotificationController {
    useEffect(() => {
        const allEventsHandler = function (events: Array<DomainNotification>) {
            multitab.message(events);
        };

        const multitabDisconnect = multitab.connect();

        multitabOnMessageUnSub();
        multitabOnMessageUnSub = multitab.onMessage((notifications: Array<DomainNotification>) => {
            notifications.forEach((notification) => notificationController.emitEvent(notification.type, [ notification ]));
        });

        multitab.onParent(() => {
            multitabOnMessageUnSub();
            if (!notificationController.isConnected()) {
                notificationController.connect(`${ __API__ }/v1/notification`, () => ({
                    accessToken : localStorage.getItem(LOCAL_STORAGE_USER_ACCESS_TOKEN),
                    refreshToken: localStorage.getItem(LOCAL_STORAGE_USER_REFRESH_TOKEN),
                    id          : getConnectionId(),
                }));

                notificationController.subscribeOnAll(allEventsHandler);
            }
        });

        multitab.onUnParent(() => {
            multitabOnMessageUnSub();
            multitabOnMessageUnSub = multitab.onMessage((notifications: Array<DomainNotification>) => {
                notifications.forEach((notification) => notificationController.emitEvent(notification.type, [ notification ]));
            });
            notificationController.unsubscribeFromAll(allEventsHandler);
            notificationController.disconnect();
        });

        connections.add(id);

        return () => {
            connections.delete(id);
            if (connections.size === 0) {
                notificationController.unsubscribeFromAll(allEventsHandler);
                multitabDisconnect();
                multitabOnMessageUnSub();
                notificationController.disconnect();
            }
        };
    }, [ id ]);

    return notificationController;
};