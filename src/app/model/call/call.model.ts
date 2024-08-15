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
import { DomainCallAnswer } from 'product-types/dist/call/DomainCallAnswer';


// TODO: Всё временное

export const createCallOfferEffect              = effect(createCallOfferAction);
export const createCallOfferNotificationEffect  = effect(createCallOfferNotificationAction);
export const createCallAnswerEffect             = effect(createCallAnswerAction);
export const createCallAnswerNotificationEffect = effect(createCallAnswerNotificationAction);

export type PeerConnectionModel = Record<string, {
    peerConnection: RTCPeerConnection;
    user: DomainUser;
    offer: DomainCallOffer;
    answer: DomainCallAnswer;
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
                user          : null,
                answer        : null,
                offer         : null,
                active        : false,
            };

            return { ...state };
        },
    )
    .on(
        createCallOfferEffect,
        'onSuccess',
        (state, { args, result }) => {
            const [ peer, offer, response ] = result;
            const data                      = state[args[0]];

            state[args[0]] = {
                peerConnection: peer,
                active        : data.active,
                offer         : offer,
                user          : response.user,
                answer        : data.answer,
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
                user          : null,
                answer        : null,
                offer         : null,
                active        : false,
            };

            return { ...state };
        },
    )
    .on(
        createCallAnswerEffect,
        'onSuccess',
        (state, { args, result }) => {
            const [ peer, answer, response ] = result;
            const data                       = state[args[0]];

            state[args[0]] = {
                peerConnection: peer,
                active        : data.active,
                offer         : data.offer,
                user          : response.user,
                answer        : answer,
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
                    user          : result.user,
                    answer        : null,
                    offer         : result.offer,
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
                user          : result.user,
                answer        : result.answer,
                offer         : data.offer,
                active        : true,
            };

            return { ...state };
        },
    );