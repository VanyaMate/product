import { effect, store } from '@vanyamate/sec';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import {
    DomainMessage,
    isDomainMessage,
} from 'product-types/dist/message/DomainMessage';
import {
    getPrivateMessageByCursorAction,
} from '@/app/action/private-messages/getPrivateMessagesByCursor/getPrivateMessageByCursor.action.ts';
import {
    getPrivateMessageByQueryAction,
} from '@/app/action/private-messages/getPrivateMessagesByQuery/getPrivateMessageByQuery.action.ts';
import {
    readAllPrivateMessageAction,
} from '@/app/action/private-messages/readAllPrivateMessages/readAllPrivateMessage.action.ts';
import {
    readPrivateMessageAction,
} from '@/app/action/private-messages/readPrivateMessage/readPrivateMessage.action.ts';
import {
    removePrivateMessageAction,
} from '@/app/action/private-messages/removePrivateMessage/removePrivateMessage.action.ts';
import {
    sendPrivateMessageAction,
} from '@/app/action/private-messages/sendPrivateMessage/sendPrivateMessage.action.ts';
import {
    updatePrivateMessageAction,
} from '@/app/action/private-messages/updatePrivateMessage/updatePrivateMessage.action.ts';
import {
    getListPrivateDialogueEffect,
    getOnePrivateDialogueEffect,
} from '@/app/model/private-dialogues/private-dialogues.model.ts';
import { returnValidErrors } from '@/app/lib/error/returnValidErrors.ts';
import { logoutEffect } from '@/app/model/auth/auth.model.ts';
import {
    resetPrivateMessageSearchAction,
} from '@/app/action/private-messages/resetMessageSearch/resetPrivateMessageSearch.action.ts';


export const getPrivateMessagesByCursorEffect = effect(getPrivateMessageByCursorAction);
export const getPrivateMessagesByQueryEffect  = effect(getPrivateMessageByQueryAction);
export const readAllPrivateMessagesEffect     = effect(readAllPrivateMessageAction);
export const readPrivateMessageEffect         = effect(readPrivateMessageAction);
export const removePrivateMessageEffect       = effect(removePrivateMessageAction);
export const sendPrivateMessageEffect         = effect(sendPrivateMessageAction);
export const updatePrivateMessageEffect       = effect(updatePrivateMessageAction);
export const resetPrivateMessagesSearchEffect = effect(resetPrivateMessageSearchAction);


export const $privateMessagesIsPending = store<Record<string, boolean>>({})
    .on(
        getPrivateMessagesByCursorEffect,
        'onBefore',
        (state, { args: [ [ dialogueId ] ] }) => ({
            ...state,
            [dialogueId]: true,
        }),
    )
    .on(
        getPrivateMessagesByCursorEffect,
        'onFinally',
        (state, { args: [ [ dialogueId ] ] }) => ({
            ...state,
            [dialogueId]: false,
        }),
    )
    .on(
        getPrivateMessagesByQueryEffect,
        'onBefore',
        (state, { args: [ [ dialogueId ] ] }) => ({
            ...state,
            [dialogueId]: true,
        }),
    )
    .on(
        getPrivateMessagesByQueryEffect,
        'onFinally',
        (state, { args: [ [ dialogueId ] ] }) => ({
            ...state,
            [dialogueId]: false,
        }),
    )
    .on(
        getOnePrivateDialogueEffect,
        'onBefore',
        (state, { args: [ dialogueId ] }) => ({
            ...state,
            [dialogueId]: true,
        }),
    )
    .on(
        getOnePrivateDialogueEffect,
        'onFinally',
        (state, { args: [ dialogueId ] }) => ({
            ...state,
            [dialogueId]: false,
        }),
    );


export const $privateMessagesError = store<Record<string, DomainServiceResponseError | null>>({})
    .on(
        getPrivateMessagesByQueryEffect,
        'onError',
        (state, { args: [ [ dialogueId ] ], error }) => ({
            ...state,
            [dialogueId]: returnValidErrors(error),
        }),
    )
    .on(
        getPrivateMessagesByCursorEffect,
        'onError',
        (state, { args: [ [ dialogueId ] ], error }) => ({
            ...state,
            [dialogueId]: returnValidErrors(error),
        }),
    )
    .on(
        getOnePrivateDialogueEffect,
        'onError',
        (state, { args: [ dialogueId ], error }) => ({
            ...state,
            [dialogueId]: returnValidErrors(error),
        }),
    )
    .on(
        getPrivateMessagesByQueryEffect,
        'onSuccess',
        (state, { args: [ [ dialogueId ] ] }) => {
            delete state[dialogueId];
            return { ...state };
        },
    )
    .on(
        getPrivateMessagesByCursorEffect,
        'onSuccess',
        (state, { args: [ [ dialogueId ] ] }) => {
            delete state[dialogueId];
            return { ...state };
        },
    )
    .on(
        getOnePrivateDialogueEffect,
        'onSuccess',
        (state, { args: [ [ dialogueId ] ] }) => {
            delete state[dialogueId];
            return { ...state };
        },
    )
    .on(logoutEffect, 'onBefore', () => ({}));


export const $privateMessages = store<Record<string, Array<DomainMessage>>>({})
    .on(
        getPrivateMessagesByQueryEffect,
        'onSuccess',
        (state, { args: [ [ dialogueId ] ], result }) => {
            const messages = result.list.filter(isDomainMessage);
            return {
                ...state,
                [dialogueId]: [ ...messages, ...(state[dialogueId] ?? []) ],
            };
        },
    )
    .on(
        getPrivateMessagesByCursorEffect,
        'onSuccess',
        (state, { args: [ [ dialogueId ] ], result }) => {
            const messages = result.list.filter(isDomainMessage);
            return {
                ...state,
                [dialogueId]: [ ...messages, ...(state[dialogueId] ?? []) ],
            };
        },
    )
    .on(
        getOnePrivateDialogueEffect,
        'onSuccess',
        (state, { args: [ dialogueId ], result }) => {
            const messages = result.messages;
            return {
                ...state,
                [dialogueId]: messages,
            };
        },
    )
    .on(
        getListPrivateDialogueEffect,
        'onSuccess',
        (_, { result }) => result.reduce((acc, dialogue) => ({
            ...acc,
            [dialogue.id]: dialogue.messages,
        }), {}),
    )
    .on(
        removePrivateMessageEffect,
        'onSuccess',
        (state, { result }) => {
            const messages = state[result.dialogue.id]?.filter(({ id }) => id !== result.message.id) ?? [];
            return {
                ...state,
                [result.dialogue.id]: messages,
            };
        },
    )
    .on(
        sendPrivateMessageEffect,
        'onSuccess',
        (state, { result }) => {
            const messages = state[result.dialogue.id] ?? [];
            messages.push(result.message);
            return {
                ...state,
                [result.dialogue.id]: messages,
            };
        },
    )
    .on(
        updatePrivateMessageEffect,
        'onSuccess',
        (state, { result }) => {
            const messages = (state[result.dialogue.id] ?? [])
                .map((message) => message.id === result.message.id
                                  ? result.message : message);
            return {
                ...state,
                [result.dialogue.id]: messages,
            };
        },
    )
    .on(
        readAllPrivateMessagesEffect,
        'onSuccess',
        (state, { result }) => {
            const messages = (state[result.dialogue.id] ?? [])
                .map((message) => ({ ...message, read: true }));
            return {
                ...state,
                [result.dialogue.id]: messages,
            };
        },
    )
    .on(
        readPrivateMessageEffect,
        'onSuccess',
        (state, { result }) => {
            const messages = (state[result.dialogue.id] ?? [])
                .map((message) => message.id === result.message.id
                                  ? { ...message, read: true } : message);
            return {
                ...state,
                [result.dialogue.id]: messages,
            };
        },
    )
    .on(logoutEffect, 'onBefore', () => ({}));


export const $privateMessagesHasMore = store<Record<string, boolean>>({})
    .on(
        getPrivateMessagesByCursorEffect,
        'onSuccess',
        (state, { result, args: [ [ dialogueId, options ] ] }) => ({
            ...state,
            [dialogueId]: options.limit === result.list.length,
        }),
    )
    .on(
        getPrivateMessagesByCursorEffect,
        'onSuccess',
        (state, { result, args: [ [ dialogueId, options ] ] }) => ({
            ...state,
            [dialogueId]: options.limit === result.list.length,
        }),
    )
    .on(
        getOnePrivateDialogueEffect,
        'onSuccess',
        (state, { args: [ dialogueId ] }) => ({
            ...state,
            [dialogueId]: true,
        }),
    )
    .on(
        getListPrivateDialogueEffect,
        'onSuccess',
        (state, { result }) => ({
            ...state,
            ...result.reduce((acc, dialogue) => ({
                ...acc,
                [dialogue.id]: true,
            }), {}),
        }),
    )
    .on(logoutEffect, 'onBefore', () => ({}));

export const $privateMessageScrollToId = store<string>('')
    .on(
        getPrivateMessagesByCursorEffect,
        'onSuccess',
        (_, { result }) => {
            const lastItem: unknown = result.list.slice(-1)[0];
            if (isDomainMessage(lastItem)) {
                return lastItem.id;
            } else {
                return '';
            }
        },
    )
    .on(
        getPrivateMessagesByCursorEffect,
        'onSuccess',
        (_, { result }) => {
            const lastItem: unknown = result.list.slice(-1)[0];
            if (isDomainMessage(lastItem)) {
                return lastItem.id;
            } else {
                return '';
            }
        },
    );


export const $privateMessagesSearchMessages = store<Record<string, Array<DomainMessage>>>({})
    .on(getPrivateMessagesByQueryEffect, 'onSuccess', (state, {
        result,
        args: [ [ dialogueId ] ],
    }) => ({
        ...state,
        [dialogueId]: result.list.filter(isDomainMessage),
    }))
    .on(resetPrivateMessagesSearchEffect, 'onSuccess', (state, { args: [ dialogueId ] }) => {
        delete state[dialogueId];
        return { ...state };
    });
