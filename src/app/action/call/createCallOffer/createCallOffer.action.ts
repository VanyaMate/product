import { request } from '@/app/lib/fetch/request.ts';
import {
    DomainNotificationCallOfferData,
    isDomainNotificationCallOfferData,
} from 'product-types/dist/notification/notification-data-types/call/DomainNotificationCallOfferData';


export const createCallOfferAction = async function (toUserId: string): Promise<[ RTCPeerConnection, MediaStream, MediaStream, DomainNotificationCallOfferData ]> {
    // Создаю свой стрим
    const localStream  = await navigator.mediaDevices.getDisplayMedia({
        video: true,
    });
    const remoteStream = new MediaStream();

    // Создаю пир соединение
    const peerConnection = new RTCPeerConnection({
        iceServers: [
            {
                urls: [
                    'stun:stun.l.google.com:19302',
                    'stun:stun1.l.google.com:19302',
                    'stun:stun2.l.google.com:19302',
                    'stun:stun.chathelp.ru:3478',
                ],
            },
            {
                urls      : 'turn:192.158.29.39:3478?transport=tcp',
                credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                username  : '28224511:1379330808',
            },
            {
                urls      : 'turn:turn.anyfirewall.com:443?transport=tcp',
                credential: 'webrtc',
                username  : 'webrtc',
            },
        ],
    });

    // Добавляю свой стрим в пир соединение
    localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));

    // Добавляю стрим из пира в remoteStream
    peerConnection.ontrack = (e) => {
        e.streams[0].getTracks().forEach((track) => remoteStream.addTrack(track));
    };

    // Создаю offer
    const offer = await peerConnection.createOffer({
        offerToReceiveVideo: true,
    });

    // Устанавливаю локальное описание соединения
    await peerConnection.setLocalDescription(offer);

    // Отправляю заявку
    const response = await request(
        `v1/call/offer/${ toUserId }`,
        { method: 'POST', body: JSON.stringify(offer) },
        isDomainNotificationCallOfferData,
    );

    return [
        peerConnection,
        localStream,
        remoteStream,
        response,
    ];
};