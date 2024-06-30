import { effect, store } from '@vanyamate/sec';
import {
    DomainServiceResponseError,
} from 'product-types/dist/error/DomainServiceResponseError';
import {
    DomainPrivateDialogueFull,
} from 'product-types/dist/private-dialogue/DomainPrivateDialogueFull';
import {
    archivePrivateDialogueAction,
} from '@/app/action/private-dialogues/archivePrivateDialogue/archivePrivateDialogue.action.ts';
import {
    unArchivePrivateDialogueAction,
} from '@/app/action/private-dialogues/unArchivePrivateDialogue/unArchivePrivateDialogue.action.ts';
import {
    createPrivateDialogueAction,
} from '@/app/action/private-dialogues/createPrivateDialogue/createPrivateDialogue.action.ts';
import {
    removePrivateDialogueAction,
} from '@/app/action/private-dialogues/removePrivateDialogue/removePrivateDialogue.action.ts';
import {
    getListPrivateDialogueAction,
} from '@/app/action/private-dialogues/getListPrivateDialogue/getListPrivateDialogue.action.ts';
import {
    getOnePrivateDialogueAction,
} from '@/app/action/private-dialogues/getOnePrivateDialogue/getOnePrivateDialogue.action.ts';
import { returnValidErrors } from '@/app/lib/error/returnValidErrors.ts';
import { logoutEffect } from '@/app/model/auth/auth.model.ts';


export type PrivateDialogueStatus = {
    isPending: boolean,
    error: DomainServiceResponseError | null
};

export type PrivateDialogueStatusWithUser = PrivateDialogueStatus & {
    created: boolean;
    dialogueId: string;
}


export const archivePrivateDialogueEffect   = effect(archivePrivateDialogueAction);
export const unArchivePrivateDialogueEffect = effect(unArchivePrivateDialogueAction);
export const createPrivateDialogueEffect    = effect(createPrivateDialogueAction);
export const removePrivateDialogueEffect    = effect(removePrivateDialogueAction);
export const getListPrivateDialogueEffect   = effect(getListPrivateDialogueAction);
export const getOnePrivateDialogueEffect    = effect(getOnePrivateDialogueAction);


export const privateDialoguesIsPending = store<boolean>(false)
    .on(archivePrivateDialogueEffect, 'onBefore', () => true)
    .on(unArchivePrivateDialogueEffect, 'onBefore', () => true)
    .on(createPrivateDialogueEffect, 'onBefore', () => true)
    .on(removePrivateDialogueEffect, 'onBefore', () => true)
    .on(getListPrivateDialogueEffect, 'onBefore', () => true)
    .on(getOnePrivateDialogueEffect, 'onBefore', () => true)
    .on(archivePrivateDialogueEffect, 'onFinally', () => false)
    .on(unArchivePrivateDialogueEffect, 'onFinally', () => false)
    .on(createPrivateDialogueEffect, 'onFinally', () => false)
    .on(removePrivateDialogueEffect, 'onFinally', () => false)
    .on(getListPrivateDialogueEffect, 'onFinally', () => false)
    .on(getOnePrivateDialogueEffect, 'onFinally', () => false);


export const privateDialoguesError = store<DomainServiceResponseError | null>(null)
    .on(archivePrivateDialogueEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(unArchivePrivateDialogueEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(createPrivateDialogueEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(removePrivateDialogueEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(getListPrivateDialogueEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(getOnePrivateDialogueEffect, 'onError', (_, { error }) => returnValidErrors(error))
    .on(archivePrivateDialogueEffect, 'onSuccess', () => null)
    .on(unArchivePrivateDialogueEffect, 'onSuccess', () => null)
    .on(createPrivateDialogueEffect, 'onSuccess', () => null)
    .on(removePrivateDialogueEffect, 'onSuccess', () => null)
    .on(getListPrivateDialogueEffect, 'onSuccess', () => null)
    .on(getOnePrivateDialogueEffect, 'onSuccess', () => null);

export const privateDialogues = store<Array<DomainPrivateDialogueFull>>([])
    .on(
        archivePrivateDialogueEffect,
        'onSuccess',
        (state, { args: [ dialogueId ] }) =>
            state.map((dialogue) => dialogue.id === dialogueId ? {
                ...dialogue,
                meArchived: true,
            } : dialogue),
    )
    .on(
        unArchivePrivateDialogueEffect,
        'onSuccess',
        (state, { args: [ dialogueId ] }) =>
            state.map((dialogue) => dialogue.id === dialogueId ? {
                ...dialogue,
                meArchived: false,
            } : dialogue),
    )
    .on(
        createPrivateDialogueEffect,
        'onSuccess',
        (state, { result }) => [ ...state, result.dialogue ],
    )
    .on(
        removePrivateDialogueEffect,
        'onSuccess',
        (state, { args: [ dialogueId ] }) =>
            state.filter((dialogue) => dialogue.id !== dialogueId),
    )
    .on(getListPrivateDialogueEffect, 'onSuccess', (_, { result }) => result)
    .on(
        getOnePrivateDialogueEffect,
        'onSuccess',
        (state, { result }) =>
            state.some((d) => d.id === result.id) ? state
                                                  : [ ...state, result ],
    )
    .on(logoutEffect, 'onBefore', () => []);


export const privateDialoguesStatus = store<Record<string, PrivateDialogueStatus>>({})
    .on(
        archivePrivateDialogueEffect,
        'onBefore',
        (state, { args: [ dialogueId ] }) => ({
            ...state,
            [dialogueId]: {
                isPending: true,
                error    : null,
            },
        }),
    )
    .on(
        archivePrivateDialogueEffect,
        'onSuccess',
        (state, { args: [ dialogueId ] }) => ({
            ...state,
            [dialogueId]: {
                isPending: false,
                error    : null,
            },
        }),
    )
    .on(
        archivePrivateDialogueEffect,
        'onError',
        (state, { args: [ dialogueId ], error }) => ({
            ...state,
            [dialogueId]: {
                isPending: false,
                error    : returnValidErrors(error),
            },
        }),
    )
    .on(
        unArchivePrivateDialogueEffect,
        'onBefore',
        (state, { args: [ dialogueId ] }) => ({
            ...state,
            [dialogueId]: {
                isPending: true,
                error    : null,
            },
        }),
    )
    .on(
        unArchivePrivateDialogueEffect,
        'onSuccess',
        (state, { args: [ dialogueId ] }) => ({
            ...state,
            [dialogueId]: {
                isPending: false,
                error    : null,
            },
        }),
    )
    .on(
        unArchivePrivateDialogueEffect,
        'onError',
        (state, { args: [ dialogueId ], error }) => ({
            ...state,
            [dialogueId]: {
                isPending: false,
                error    : returnValidErrors(error),
            },
        }),
    )
    .on(
        removePrivateDialogueEffect,
        'onBefore',
        (state, { args: [ dialogueId ] }) => ({
            ...state,
            [dialogueId]: {
                isPending: true,
                error    : null,
            },
        }),
    )
    .on(
        removePrivateDialogueEffect,
        'onSuccess',
        (state, { args: [ dialogueId ] }) => ({
            ...state,
            [dialogueId]: {
                isPending: false,
                error    : null,
            },
        }),
    )
    .on(
        removePrivateDialogueEffect,
        'onError',
        (state, { args: [ dialogueId ], error }) => ({
            ...state,
            [dialogueId]: {
                isPending: false,
                error    : returnValidErrors(error),
            },
        }),
    )
    .on(
        getListPrivateDialogueEffect,
        'onSuccess',
        (_, { result }) => {
            const status: Record<string, PrivateDialogueStatus> = {};

            result.forEach((dialogue) => status[dialogue.id] = {
                isPending: false,
                error    : null,
            });

            return status;
        },
    )
    .on(
        getOnePrivateDialogueEffect,
        'onBefore',
        (state, { args: [ dialogueId ] }) => ({
            ...state,
            [dialogueId]: { isPending: true, error: null },
        }),
    )
    .on(
        getOnePrivateDialogueEffect,
        'onSuccess',
        (state, { args: [ dialogueId ] }) => ({
            ...state,
            [dialogueId]: { isPending: false, error: null },
        }),
    )
    .on(
        getOnePrivateDialogueEffect,
        'onError',
        (state, { args: [ dialogueId ], error }) => ({
            ...state,
            [dialogueId]: { isPending: false, error: returnValidErrors(error) },
        }),
    );


export const privateDialogueWithUser = store<Record<string, PrivateDialogueStatusWithUser>>({})
    .on(
        archivePrivateDialogueEffect,
        'onBefore',
        (state, { args: [ userId ] }) => ({
            ...state,
            [userId]: {
                isPending : true,
                error     : null,
                created   : state[userId]?.created ?? false,
                dialogueId: state[userId]?.dialogueId ?? '',
            },
        }),
    )
    .on(
        archivePrivateDialogueEffect,
        'onSuccess',
        (state, { args: [ userId ], result }) => ({
            ...state,
            [userId]: {
                isPending : false,
                error     : null,
                created   : state[userId]?.created ?? true,
                dialogueId: state[userId]?.dialogueId ?? result.dialogue.id,
            },
        }),
    )
    .on(
        archivePrivateDialogueEffect,
        'onError',
        (state, { args: [ userId ], error }) => ({
            ...state,
            [userId]: {
                isPending : false,
                error     : returnValidErrors(error),
                created   : state[userId]?.created ?? false,
                dialogueId: state[userId]?.dialogueId ?? '',
            },
        }),
    )
    .on(
        unArchivePrivateDialogueEffect,
        'onBefore',
        (state, { args: [ userId ] }) => ({
            ...state,
            [userId]: {
                isPending : true,
                error     : null,
                created   : state[userId]?.created ?? false,
                dialogueId: state[userId]?.dialogueId ?? '',
            },
        }),
    )
    .on(
        unArchivePrivateDialogueEffect,
        'onSuccess',
        (state, { args: [ userId ], result }) => ({
            ...state,
            [userId]: {
                isPending : false,
                error     : null,
                created   : state[userId]?.created ?? true,
                dialogueId: state[userId]?.dialogueId ?? result.dialogue.id,
            },
        }),
    )
    .on(
        unArchivePrivateDialogueEffect,
        'onError',
        (state, { args: [ userId ], error }) => ({
            ...state,
            [userId]: {
                isPending : false,
                error     : returnValidErrors(error),
                created   : state[userId]?.created ?? false,
                dialogueId: state[userId]?.dialogueId ?? '',
            },
        }),
    )
    .on(
        removePrivateDialogueEffect,
        'onBefore',
        (state, { args: [ userId ] }) => ({
            ...state,
            [userId]: {
                isPending : true,
                error     : null,
                created   : state[userId]?.created ?? false,
                dialogueId: state[userId]?.dialogueId ?? '',
            },
        }),
    )
    .on(
        removePrivateDialogueEffect,
        'onSuccess',
        (state, { args: [ userId ] }) => {
            delete state[userId];
            return { ...state };
        },
    )
    .on(
        removePrivateDialogueEffect,
        'onError',
        (state, { args: [ userId ], error }) => ({
            ...state,
            [userId]: {
                isPending : true,
                error     : returnValidErrors(error),
                created   : state[userId]?.created ?? false,
                dialogueId: state[userId]?.dialogueId ?? '',
            },
        }),
    )
    .on(
        getListPrivateDialogueEffect,
        'onSuccess',
        (_, { result }) => {
            const status: Record<string, PrivateDialogueStatusWithUser> = {};

            result.forEach((dialogue) => status[dialogue.user.id] = {
                isPending : false,
                error     : null,
                created   : true,
                dialogueId: dialogue.id,
            });

            return status;
        },
    )
    .on(
        getOnePrivateDialogueEffect,
        'onSuccess',
        (state, { result }) => ({
            ...state,
            [result.user.id]: {
                isPending : false,
                error     : null,
                created   : state[result.user.id]?.created ?? true,
                dialogueId: result.id,
            },
        }),
    );