import {
    useNotification,
} from '@/features/notification/hooks/useNotification.ts';
import { useLayoutEffect } from 'react';
import { applyEffect } from '@/features/notification/lib/applyEffect.ts';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    createCallAnswerNotificationEffect,
    createCallOfferNotificationEffect,
    createCallRequestNotificationEffect,
    finishCallNotificationEffect,
} from '@/app/model/call/call.model.ts';


export const useCallStoreUpdaterByNotifications = function () {
    const notifications = useNotification('call-store-updater');

    useLayoutEffect(() => {
        const onCallOffer  = applyEffect(createCallOfferNotificationEffect);
        const onCallAnswer = applyEffect(createCallAnswerNotificationEffect);
        const onCallStart  = applyEffect(createCallRequestNotificationEffect);
        const onCallFinish = applyEffect(finishCallNotificationEffect);

        notifications.subscribe(DomainNotificationType.CALL_ANSWER_OUT, onCallAnswer);
        notifications.subscribe(DomainNotificationType.CALL_OFFER_OUT, onCallOffer);
        notifications.subscribe(DomainNotificationType.CALL_START_IN, onCallStart);
        notifications.subscribe(DomainNotificationType.CALL_START_OUT, onCallStart);
        notifications.subscribe(DomainNotificationType.CALL_FINISH_OUT, onCallFinish);

        return () => {
            notifications.unsubscribe(DomainNotificationType.CALL_ANSWER_OUT, onCallAnswer);
            notifications.unsubscribe(DomainNotificationType.CALL_OFFER_OUT, onCallOffer);
            notifications.unsubscribe(DomainNotificationType.CALL_START_IN, onCallStart);
            notifications.unsubscribe(DomainNotificationType.CALL_START_OUT, onCallStart);
            notifications.unsubscribe(DomainNotificationType.CALL_FINISH_OUT, onCallFinish);
        };
    }, [ notifications ]);
};