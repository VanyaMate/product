import { DomainCallOffer } from 'product-types/dist/call/DomainCallOffer';
import { request } from '@/app/lib/fetch/request.ts';
import {
    DomainNotificationCallAnswerData,
    isDomainNotificationCallAnswerData,
} from 'product-types/dist/notification/notification-data-types/call/DomainNotificationCallAnswerData';


export const createCallAnswerAction = async function (toUserId: string, offer: DomainCallOffer): Promise<[ RTCPeerConnection, MediaStream, MediaStream, DomainNotificationCallAnswerData ]> {
    const devices          = await window.navigator.mediaDevices.enumerateDevices();
    const videoDeviceExist = devices.some((device) => device.kind === 'videoinput');

    // Создаю свой стрим
    const localStream  = videoDeviceExist
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

    // Добавляю кандидатов в массив
    peerConnection.onicecandidate = (e) => {
        candidates.push(e.candidate);
    };

    // Устанавливаю удаленное описание соединения
    await peerConnection.setRemoteDescription(offer.offer);
    await Promise.all(offer.candidates.map((candidate) => peerConnection.addIceCandidate(candidate)));

    // Создаю ответ
    const answer = await peerConnection.createAnswer();

    // Устанавливаю локальное описание соединения
    await peerConnection.setLocalDescription(answer);

    // Жду пока все кандидаты добавятся (надо будет поменять)
    await new Promise<void>((resolve) => {
        setTimeout(resolve, 1000);
    });

    // Отправляю ответ
    const response = await request(
        `v1/call/answer/${ toUserId }`,
        { method: 'POST', body: JSON.stringify({ answer, candidates }) },
        isDomainNotificationCallAnswerData,
    );

    return [
        peerConnection,
        localStream,
        remoteStream,
        response,
    ];
};