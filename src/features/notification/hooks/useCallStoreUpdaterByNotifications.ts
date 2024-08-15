import {
    useNotification,
} from '@/features/notification/hooks/useNotification.ts';
import { useLayoutEffect } from 'react';
import { applyEffect } from '@/features/notification/lib/applyEffect.ts';
import {
    DomainNotificationType,
} from 'product-types/dist/notification/DomainNotification';
import {
    createCallAnswerNotificationEffect, createCallOfferNotificationEffect,
} from '@/app/model/call/call.model.ts';


export const useCallStoreUpdaterByNotifications = function () {
    const notifications = useNotification('call-store-updater');

    useLayoutEffect(() => {
        const onCallOffer  = applyEffect(createCallOfferNotificationEffect);
        const onCallAnswer = applyEffect(createCallAnswerNotificationEffect);

        notifications.subscribe(DomainNotificationType.CALL_ANSWER_OUT, onCallAnswer);
        notifications.subscribe(DomainNotificationType.CALL_OFFER_OUT, onCallOffer);

        return () => {
            notifications.unsubscribe(DomainNotificationType.CALL_ANSWER_OUT, onCallAnswer);
            notifications.unsubscribe(DomainNotificationType.CALL_OFFER_OUT, onCallOffer);
        };
    }, [ notifications ]);
};