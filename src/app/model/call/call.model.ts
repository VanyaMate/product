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
import {
    createCallRequestNotificationAction,
} from '@/app/action/call/createCallRequest/createCallRequestNotification.action.ts';
import {
    finishCallNotificationAction,
} from '@/app/action/call/finishCall/finishCallNotification.action.ts';


// TODO: Всё временное

export const createCallOfferEffect               = effect(createCallOfferAction);
export const createCallOfferNotificationEffect   = effect(createCallOfferNotificationAction);
export const createCallAnswerEffect              = effect(createCallAnswerAction);
export const createCallAnswerNotificationEffect  = effect(createCallAnswerNotificationAction);
export const createCallRequestEffect             = effect(createCallRequestAction);
export const createCallRequestNotificationEffect = effect(createCallRequestNotificationAction);
export const finishCallEffect                    = effect(finishCallAction);
export const finishCallNotificationEffect        = effect(finishCallNotificationAction);
export const getMyNotFinishedCallsEffect         = effect(getMyNotFinishedCallsAction);

export type PeerConnectionModel = Record<string, {
    peerConnection: RTCPeerConnection;
    localStream: MediaStream;
    remoteStream: MediaStream;
    call: DomainCall;
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
        createCallRequestNotificationEffect,
        'onSuccess',
        (state, { result }) => {
            if (!state[result.call.user.id]) {
                state[result.call.user.id] = {
                    peerConnection: null,
                    localStream   : null,
                    remoteStream  : null,
                    call          : result.call,
                    active        : false,
                };
                return { ...state };
            }
            return state;
        },
    )
    .on(
        finishCallEffect,
        'onSuccess',
        (state, { result }) => {
            const call = state[result.call.user.id];
            if (call) {
                const { peerConnection, localStream, remoteStream } = call;

                peerConnection?.close();
                localStream?.getTracks().forEach((track) => track.stop());
                remoteStream?.getTracks().forEach((track) => track.stop());

                delete state[result.call.user.id];
                return { ...state };
            }

            return state;
        },
    )
    .on(
        finishCallNotificationEffect,
        'onSuccess',
        (state, { result }) => {
            const call = state[result.call.user.id];
            if (call) {
                const { peerConnection, localStream, remoteStream } = call;

                peerConnection?.close();
                localStream?.getTracks().forEach((track) => track.stop());
                remoteStream?.getTracks().forEach((track) => track.stop());

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
        'onSuccess',
        (state, { result }) => {
            const [ peerConnection, localStream, remoteStream, response ] = result;

            state[response.call.user.id] = {
                peerConnection,
                localStream,
                remoteStream,
                active: false,
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
                call          : null,
                active        : false,
            };

            return { ...state };
        },
    )
    .on(
        createCallAnswerEffect,
        'onSuccess',
        (state, { result }) => {
            const [ peerConnection, localStream, remoteStream, response ] = result;

            state[response.call.user.id] = {
                peerConnection,
                localStream,
                remoteStream,
                active: true,
                call  : response.call,
            };

            return { ...state };
        },
    )
    .on(
        createCallOfferNotificationEffect,
        'onSuccess',
        (state, { result }) => {
            const [ notification, answer ]                      = result;
            const [ peerConnection, localStream, remoteStream ] = answer;

            state[notification.call.user.id] = {
                peerConnection: peerConnection,
                localStream   : localStream,
                remoteStream  : remoteStream,
                call          : notification.call,
                active        : true,
            };

            return { ...state };
        },
    )
    .on(
        createCallAnswerNotificationEffect,
        'onSuccess',
        (state, { result }) => {
            const data = state[result.call.user.id];

            if (data) {
                data.peerConnection.setRemoteDescription(result.answer.answer as RTCSessionDescriptionInit);
                result.answer.candidates.forEach((candidate) => data.peerConnection.addIceCandidate(candidate));

                state[result.call.user.id] = {
                    peerConnection: data.peerConnection,
                    localStream   : data.localStream,
                    remoteStream  : data.remoteStream,
                    call          : data.call,
                    active        : true,
                };
            }

            return { ...state };
        },
    );