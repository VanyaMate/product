import { request } from '@/app/lib/fetch/request.ts';
import {
    DomainNotificationCallStartData,
    isDomainNotificationCallStartData,
} from 'product-types/dist/notification/notification-data-types/call/DomainNotificationCallStartData';


export const createCallOfferAction = async function (callId: string): Promise<[ RTCPeerConnection, MediaStream, MediaStream, DomainNotificationCallStartData ]> {
    const devices          = await window.navigator.mediaDevices.enumerateDevices();
    const videoDeviceExist = devices.some((device) => device.kind === 'videoinput');

    // Создаю свой стрим
    const localStream = videoDeviceExist
                        ?
                        await navigator.mediaDevices.getUserMedia({
                            video: true,
                            audio: true,
                        })
                        :
                        await navigator.mediaDevices.getDisplayMedia({
                            video: true,
                            audio: true,
                        });

    const remoteStream = new MediaStream();

    // Список кандидатов
    const candidates: RTCIceCandidate[] = [];

    // Создаю пир соединение
    const peerConnection = new RTCPeerConnection({
        iceServers: [
            {
                urls: [
                    'stun:stun1.l.google.com:19302',
                    'stun:stun2.l.google.com:19302',
                ],
            },
        ],
    });

    // Добавляю свой стрим в пир соединение
    localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream));

    // Добавляю стрим из пира в remoteStream
    peerConnection.ontrack = (e) => {
        e.streams[0].getTracks().forEach((track) => remoteStream.addTrack(track));
    };

    peerConnection.onicecandidate = (e) => {
        candidates.push(e.candidate);
    };

    // Создаю offer
    const offer = await peerConnection.createOffer();

    // Устанавливаю локальное описание соединения
    await peerConnection.setLocalDescription(offer);

    // Жду пока все кандидаты добавятся (надо будет поменять)
    await new Promise<void>((resolve) => {
        setTimeout(resolve, 1000);
    });

    // Отправляю заявку
    const response = await request(
        `v1/call/offer/${ callId }`,
        { method: 'POST', body: JSON.stringify({ offer, candidates }) },
        isDomainNotificationCallStartData,
    );

    return [
        peerConnection,
        localStream,
        remoteStream,
        response,
    ];
};