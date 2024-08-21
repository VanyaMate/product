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
import { DomainCallOffer } from 'product-types/dist/call/DomainCallOffer';
import { DomainCall } from 'product-types/dist/call/DomainCall';
import {
    createCallRequestAction,
} from '@/app/action/call/createCallRequest/createCallRequest.action.ts';
import {
    getMyNotFinishedCallsAction,
} from '@/app/action/call/getMyNotFinishedCalls/getMyNotFinishedCalls.action.ts';
import {
    finishCallAction,
} from '@/app/action/call/finishCall/finishCall.action.ts';


// TODO: Всё временное

export const createCallOfferEffect              = effect(createCallOfferAction);
export const createCallOfferNotificationEffect  = effect(createCallOfferNotificationAction);
export const createCallAnswerEffect             = effect(createCallAnswerAction);
export const createCallAnswerNotificationEffect = effect(createCallAnswerNotificationAction);
export const createCallRequestEffect            = effect(createCallRequestAction);
export const finishCallEffect                   = effect(finishCallAction);
export const getMyNotFinishedCallsEffect        = effect(getMyNotFinishedCallsAction);

export type PeerConnectionModel = Record<string, {
    peerConnection: RTCPeerConnection;
    localStream: MediaStream;
    remoteStream: MediaStream;
    call: DomainCall;
    offer: DomainCallOffer;
    active: boolean;
}>

export const $callPending = store<boolean>(false)
    .on(createCallOfferEffect, 'onBefore', () => true)
    .on(createCallAnswerEffect, 'onBefore', () => true)
    .on(createCallRequestEffect, 'onBefore', () => true)
    .on(createCallOfferEffect, 'onFinally', () => false)
    .on(createCallRequestEffect, 'onFinally', () => false)
    .on(createCallAnswerEffect, 'onFinally', () => false);

export const $callPeerConnection = store<PeerConnectionModel>({})
    .on(
        finishCallEffect,
        'onSuccess',
        (state, { result }) => {
            if (state[result.call.user.id]) {
                delete state[result.call.user.id];
                return { ...state };
            }

            return state;
        },
    )
    .on(
        getMyNotFinishedCallsEffect,
        'onSuccess',
        (state, { result }) => {
            result.forEach((call) => {
                if (state[call.user.id]) {
                    return;
                }

                state[call.user.id] = {
                    peerConnection: null,
                    localStream   : null,
                    remoteStream  : null,
                    offer         : null,
                    call          : call,
                    active        : false,
                };
            });

            return { ...state };
        },
    )
    .on(
        createCallRequestEffect,
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
                call          : null,
                active        : false,
            };

            return { ...state };
        },
    )
    .on(
        createCallRequestEffect,
        'onSuccess',
        (state, { args, result }) => {
            const data = state[args[0]];

            state[args[0]] = {
                ...data,
                call: result.call,
            };

            return { ...state };
        },
    )
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
                call          : null,
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
                call  : response.call,
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
                call          : null,
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
                call  : data.call,
            };

            return { ...state };
        },
    )
    .on(
        createCallOfferNotificationEffect,
        'onSuccess',
        (state, { result }) => {
            if (!state[result.call.user.id]) {
                state[result.call.user.id] = {
                    peerConnection: null,
                    localStream   : null,
                    remoteStream  : null,
                    offer         : result.offer,
                    call          : result.call,
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
            const data = state[result.call.user.id];

            data.peerConnection.setRemoteDescription(result.answer.answer as RTCSessionDescriptionInit);
            result.answer.candidates.forEach((candidate) => data.peerConnection.addIceCandidate(candidate));

            state[result.call.user.id] = {
                peerConnection: data.peerConnection,
                localStream   : data.localStream,
                remoteStream  : data.remoteStream,
                offer         : data.offer,
                call          : data.call,
                active        : true,
            };

            return { ...state };
        },
    );