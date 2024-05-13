import {
    INotificationParser,
} from '@/shared/services/notification/parser/notification-parser.interface.ts';
import {
    DomainNotification,
    DomainNotificationType,
    isDomainNotification,
} from 'product-types/dist/notification/DomainNotification';


export class SseNotificationParser implements INotificationParser {
    getMessages (response: string): string[] {
        return response.match(/{[^{}]*}$/gm) ?? [];
    }

    getNotification (message: string): DomainNotification {
        const notificationCandidate: unknown = JSON.parse(message);
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
            type  : DomainNotificationType.UNKNOWN,
            data  : message,
            dateMs: Date.now(),
        };
    }
}