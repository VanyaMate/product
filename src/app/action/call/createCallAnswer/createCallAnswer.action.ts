import { DomainCallOffer } from 'product-types/dist/call/DomainCallOffer';
import { request } from '@/app/lib/fetch/request.ts';
import {
    DomainNotificationCallAnswerData,
    isDomainNotificationCallAnswerData,
} from 'product-types/dist/notification/notification-data-types/call/DomainNotificationCallAnswerData';
import { DomainCallAnswer } from 'product-types/dist/call/DomainCallAnswer';


export const createCallAnswerAction = async function (toUserId: string, offer: DomainCallOffer): Promise<[ RTCPeerConnection, DomainCallAnswer, DomainNotificationCallAnswerData ]> {
    const stream         = await window.navigator.mediaDevices.getDisplayMedia({
        video: true,
    });
    const peerConnection = new RTCPeerConnection();
    stream.getTracks().forEach((track) => peerConnection.addTrack(track, stream));
    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);

    return [
        peerConnection,
        answer,
        await request(
            `v1/call/answer/${ toUserId }`,
            { method: 'POST', body: JSON.stringify(answer) },
            isDomainNotificationCallAnswerData,
        ),
    ];
};