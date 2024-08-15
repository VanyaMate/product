import { effect, store } from '@vanyamate/sec';
import {
    createCallAnswerAction,
} from '@/app/action/call/createCallAnswer/createCallAnswer.action.ts';
import {
    createCallOfferAction,
} from '@/app/action/call/createCallOffer/createCallOffer.action.ts';
import {
    createCallOfferNotificationAction,
} from '@/app/action/call/createCallOffer/createCallOfferNotification.action.ts';
import {
    createCallAnswerNotificationAction,
} from '@/app/action/call/createCallAnswer/createCallAnswerNotification.action.ts';
import { DomainUser } from 'product-types/dist/user/DomainUser';
import { DomainCallOffer } from 'product-types/dist/call/DomainCallOffer';


// TODO: Всё временное

export const createCallOfferEffect              = effect(createCallOfferAction);
export const createCallOfferNotificationEffect  = effect(createCallOfferNotificationAction);
export const createCallAnswerEffect             = effect(createCallAnswerAction);
export const createCallAnswerNotificationEffect = effect(createCallAnswerNotificationAction);

export type PeerConnectionModel = Record<string, {
    peerConnection: RTCPeerConnection;
    localStream: MediaStream;
    remoteStream: MediaStream;
    user: DomainUser;
    offer: DomainCallOffer;
    active: boolean;
}>

export const $callPending = store<boolean>(false)
    .on(createCallOfferEffect, 'onBefore', () => true)
    .on(createCallAnswerEffect, 'onBefore', () => true)
    .on(createCallOfferEffect, 'onFinally', () => false)
    .on(createCallAnswerEffect, 'onFinally', () => false);

export const $callPeerConnection = store<PeerConnectionModel>({})
    .on(
        createCallOfferEffect,
        'onBefore',
        (state, { args }) => {
            if (state[args[0]]) {
                return state;
            }

            state[args[0]] = {
                peerConnection: null,
                localStream   : null,
                remoteStream  : null,
                offer         : null,
                user          : null,
                active        : false,
            };

            return { ...state };
        },
    )
    .on(
        createCallOfferEffect,
        'onSuccess',
        (state, { args, result }) => {
            const [ peerConnection, localStream, remoteStream, response ] = result;
            const data                                                    = state[args[0]];

            state[args[0]] = {
                peerConnection,
                localStream,
                remoteStream,
                active: data.active,
                offer : response.offer,
                user  : response.user,
            };

            return { ...state };
        },
    )
    .on(
        createCallAnswerEffect,
        'onBefore',
        (state, { args }) => {
            if (state[args[0]]) {
                return state;
            }

            state[args[0]] = {
                peerConnection: null,
                localStream   : null,
                remoteStream  : null,
                offer         : null,
                user          : null,
                active        : false,
            };

            return { ...state };
        },
    )
    .on(
        createCallAnswerEffect,
        'onSuccess',
        (state, { args, result }) => {
            const [ peerConnection, localStream, remoteStream ] = result;
            const data                                          = state[args[0]];

            state[args[0]] = {
                peerConnection,
                localStream,
                remoteStream,
                active: data.active,
                offer : data.offer,
                user  : data.user,
            };

            return { ...state };
        },
    )
    .on(
        createCallOfferNotificationEffect,
        'onSuccess',
        (state, { result }) => {
            if (!state[result.user.id]) {
                state[result.user.id] = {
                    peerConnection: null,
                    localStream   : null,
                    remoteStream  : null,
                    offer         : result.offer,
                    user          : result.user,
                    active        : false,
                };

                return { ...state };
            }

            return state;
        },
    )
    .on(
        createCallAnswerNotificationEffect,
        'onSuccess',
        (state, { result }) => {
            const data = state[result.user.id];

            data.peerConnection.setRemoteDescription(result.answer as RTCSessionDescriptionInit);

            state[result.user.id] = {
                peerConnection: data.peerConnection,
                localStream   : data.localStream,
                remoteStream  : data.remoteStream,
                offer         : data.offer,
                user          : data.user,
                active        : true,
            };

            return { ...state };
        },
    );