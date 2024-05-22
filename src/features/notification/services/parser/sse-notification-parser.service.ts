import {
    DomainNotification,
    DomainNotificationType,
    isDomainNotification,
} from 'product-types/dist/notification/DomainNotification';
import {
    INotificationParser,
} from '@/features/notification/services/parser/notification-parser.interface.ts';
import { jsonParse } from '@/shared/lib/json/json-parse.ts';


export class SseNotificationParser implements INotificationParser {
    getMessages (response: string): string[] {
        return response
            .split('\n\n')
            .map((message) => message.split(/^data\s/)[1])
            .filter(Boolean) ?? [];
    }

    getNotification (message: string): DomainNotification {
        const notificationCandidate: unknown = jsonParse<unknown>(message);
        if (isDomainNotification(notificationCandidate)) {
            return notificationCandidate;
        } else {
            return this._getUnknownNotification(message);
        }
    }

    getNotifications (messages: string[]): DomainNotification[] {
        return messages.map(this.getNotification.bind(this));
    }

    private _getUnknownNotification (message: string): DomainNotification {
        return {
            id          : '',
            type        : DomainNotificationType.UNKNOWN,
            data        : message,
            creationDate: new Date().toUTCString(),
        };
    }
}