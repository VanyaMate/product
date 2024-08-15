import { DomainCallOffer } from 'product-types/dist/call/DomainCallOffer';
import { request } from '@/app/lib/fetch/request.ts';
import {
    DomainNotificationCallAnswerData,
    isDomainNotificationCallAnswerData,
} from 'product-types/dist/notification/notification-data-types/call/DomainNotificationCallAnswerData';


export const createCallAnswerAction = async function (toUserId: string, offer: DomainCallOffer): Promise<[ RTCPeerConnection, MediaStream, MediaStream, DomainNotificationCallAnswerData ]> {
    // Создаю свой стрим
    const localStream  = await window.navigator.mediaDevices.getDisplayMedia({
        video: true,
    });
    const remoteStream = new MediaStream();

    // Создаю пир соединение
    const peerConnection = new RTCPeerConnection({
        iceServers          : [
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
        iceCandidatePoolSize: 20,
    });

    // Добавляю свой стрим в пир соединение
    localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));

    // Добавляю стрим из пира в remoteStream
    peerConnection.ontrack = (e) => {
        e.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
        });
    };

    // Устанавливаю удаленное описание соединения
    await peerConnection.setRemoteDescription(offer);

    // Создаю ответ
    const answer = await peerConnection.createAnswer();

    // Устанавливаю локальное описание соединения
    await peerConnection.setLocalDescription(answer);

    // Отправляю ответ
    const response = await request(
        `v1/call/answer/${ toUserId }`,
        { method: 'POST', body: JSON.stringify(answer) },
        isDomainNotificationCallAnswerData,
    );

    return [
        peerConnection,
        localStream,
        remoteStream,
        response,
    ];
};