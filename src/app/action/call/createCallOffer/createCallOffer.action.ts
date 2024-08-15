import { request } from '@/app/lib/fetch/request.ts';
import {
    DomainNotificationCallOfferData,
    isDomainNotificationCallOfferData,
} from 'product-types/dist/notification/notification-data-types/call/DomainNotificationCallOfferData';
import { DomainCallOffer } from 'product-types/dist/call/DomainCallOffer';


export const createCallOfferAction = async function (toUserId: string): Promise<[ RTCPeerConnection, DomainCallOffer, DomainNotificationCallOfferData ]> {
    const stream         = await navigator.mediaDevices.getDisplayMedia({
        video: true,
    });
    const peerConnection = new RTCPeerConnection();
    stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
    const offer = await peerConnection.createOffer({
        offerToReceiveVideo: true,
    });
    await peerConnection.setLocalDescription(offer);
    const response = await request(
        `v1/call/offer/${ toUserId }`,
        { method: 'POST', body: JSON.stringify(offer) },
        isDomainNotificationCallOfferData,
    );

    return [
        peerConnection,
        offer,
        response,
    ];
};