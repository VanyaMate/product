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
    createPrivateDialogueEffect,
    getListPrivateDialogueEffect,
    getOnePrivateDialogueEffect,
} from '@/app/model/private-dialogues/private-dialogues.model.ts';
import { returnValidErrors } from '@/app/lib/error/returnValidErrors.ts';
import { logoutEffect } from '@/app/model/auth/auth.model.ts';
import {
    resetPrivateMessageSearchAction,
} from '@/app/action/private-messages/resetMessageSearch/resetPrivateMessageSearch.action.ts';
import {
    sendPrivateMessageNotificationAction,
} from '@/app/action/private-messages/sendPrivateMessage/sendPrivateMessageNotification.action.ts';
import {
    readAllPrivateMessageNotificationAction,
} from '@/app/action/private-messages/readAllPrivateMessages/readAllPrivateMessageNotification.action.ts';
import {
    readPrivateMessageNotificationAction,
} from '@/app/action/private-messages/readPrivateMessage/readPrivateMessageNotification.action.ts';
import {
    addMessagesToStartOfList,
} from '@/app/model/private-messages/handlers/addMessagesToStartOfList.ts';


export const getPrivateMessagesByCursorEffect            = effect(getPrivateMessageByCursorAction);
export const getPrivateMessagesByQueryEffect             = effect(getPrivateMessageByQueryAction);
export const readAllPrivateMessagesEffect                = effect(readAllPrivateMessageAction);
export const readAllPrivateMessagesNotificationInEffect  = effect(readAllPrivateMessageNotificationAction);
export const readAllPrivateMessagesNotificationOutEffect = effect(readAllPrivateMessageNotificationAction);
export const readPrivateMessageEffect                    = effect(readPrivateMessageAction);
export const readPrivateMessageNotificationEffect        = effect(readPrivateMessageNotificationAction);
export const removePrivateMessageEffect                  = effect(removePrivateMessageAction);
export const sendPrivateMessageEffect                    = effect(sendPrivateMessageAction);
export const sendPrivateMessageNotificationEffect        = effect(sendPrivateMessageNotificationAction);
export const updatePrivateMessageEffect                  = effect(updatePrivateMessageAction);
export const resetPrivateMessagesSearchEffect            = effect(resetPrivateMessageSearchAction);


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


export type PrivateMessagesStore = Record<string, Array<DomainMessage>>;
export const $privateMessages = store<PrivateMessagesStore>({})
    .on(
        getPrivateMessagesByCursorEffect,
        'onSuccess',
        (state, payload) => {
            const dialogueId: string = payload.args[0][0];
            const newMessages        = payload.result.list.filter(isDomainMessage);

            if (state[dialogueId]) {
                const messages = addMessagesToStartOfList(state[dialogueId], newMessages);
                if (messages) {
                    return { ...state, [dialogueId]: messages };
                }
            } else {
                return { ...state, [dialogueId]: newMessages };
            }

            return state;
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
        (state, { result }) => {
            return result.reduce((acc, dialogue) => {
                const storeDialogue = acc[dialogue.id];
                if (storeDialogue && storeDialogue.slice(-1)[0]?.id === dialogue.messages.slice(-1)[0]?.id) {
                    return acc;
                } else {
                    acc[dialogue.id] = dialogue.messages;
                    return acc;
                }
            }, { ...state });
        },
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
                [result.dialogue.id]: [ ...messages ],
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
                .map((message) => {
                    const companionId = result.dialogue.user.id;
                    if (message.author.id === companionId) {
                        return {
                            ...message,
                            read: true,
                        };
                    } else {
                        return message;
                    }
                });
            return {
                ...state,
                [result.dialogue.id]: messages,
            };
        },
    )
    .on(
        readAllPrivateMessagesNotificationInEffect,
        'onSuccess',
        (state, { result }) => {
            const messages = (state[result.dialogue.id] ?? [])
                .map((message) => {
                    const companionId = result.dialogue.user.id;
                    if (message.author.id === companionId) {
                        return {
                            ...message,
                            read: true,
                        };
                    } else {
                        return message;
                    }
                });
            return {
                ...state,
                [result.dialogue.id]: messages,
            };
        },
    )
    .on(
        readAllPrivateMessagesNotificationOutEffect,
        'onSuccess',
        (state, { result }) => {
            const messages = (state[result.dialogue.id] ?? [])
                .map((message) => {
                    const companionId = result.dialogue.user.id;
                    if (message.author.id !== companionId) {
                        return {
                            ...message,
                            read: true,
                        };
                    } else {
                        return message;
                    }
                });
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
    .on(
        readPrivateMessageNotificationEffect,
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
    .on(
        sendPrivateMessageNotificationEffect,
        'onSuccess',
        (state, { result }) => {
            const dialogueId       = result.dialogue.id;
            const dialogueMessages = state[dialogueId];

            if (dialogueMessages) {
                const lastMessage                = dialogueMessages[dialogueMessages.length - 1];
                const isEqualMessages            = lastMessage.id !== result.message.id;
                const currentLastMessageIsNewest = new Date(lastMessage.creationDate) > new Date(result.message.creationDate);

                // TODO: Не учитывается то, что возможно "новое", но более
                //  старое сообщение пришло первым. Тогда действительно
                //  новое сообщение не добавится.

                if (isEqualMessages || currentLastMessageIsNewest) {
                    return state;
                }

                return {
                    ...state,
                    [dialogueId]: [ ...dialogueMessages, result.message ],
                };
            }
        },
    )
    .on(
        createPrivateDialogueEffect,
        'onSuccess',
        (state, { result }) => ({
            ...state,
            [result.dialogue.id]: [],
        }),
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
    .on(logoutEffect, 'onBefore', () => '');


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
