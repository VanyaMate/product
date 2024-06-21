import { createSlice } from '@reduxjs/toolkit';
import {
    PrivateMessagesSchema,
} from '@/app/redux/slices/private-messages/types/privateMessages.schema.ts';
import {
    getOnePrivateDialogues,
} from '@/app/redux/slices/private-dialogues/thunks/getOnePrivateDialogues/getOnePrivateDialogues.ts';
import {
    getListPrivateDialogues,
} from '@/app/redux/slices/private-dialogues/thunks/getListPrivateDialogues/getListPrivateDialogues.ts';
import {
    sendPrivateMessage,
} from '@/app/redux/slices/private-messages/thunks/sendPrivateMessage.ts';
import {
    readPrivateMessage,
} from '@/app/redux/slices/private-messages/thunks/readPrivateMessage.ts';
import {
    readAllPrivateMessage,
} from '@/app/redux/slices/private-messages/thunks/readAllPrivateMessage.ts';
import {
    sendPrivateMessageNotification,
} from '@/app/redux/slices/private-messages/thunks/sendPrivateMessageNotification.ts';
import {
    readPrivateMessageNotification,
} from '@/app/redux/slices/private-messages/thunks/readPrivateMessageNotification.ts';
import {
    readAllPrivateMessageNotification,
} from '@/app/redux/slices/private-messages/thunks/readAllPrivateMessageNotification.ts';
import {
    updatePrivateMessage,
} from '@/app/redux/slices/private-messages/thunks/updatePrivateMessage.ts';
import {
    updatePrivateMessageNotification,
} from '@/app/redux/slices/private-messages/thunks/updatePrivateMessageNotification.ts';
import {
    removePrivateMessage,
} from '@/app/redux/slices/private-messages/thunks/removePrivateMessage.ts';
import {
    removePrivateMessageNotification,
} from '@/app/redux/slices/private-messages/thunks/removePrivateMessageNotification.ts';
import {
    getMessagesByCursor,
} from '@/app/redux/slices/private-messages/thunks/getMessagesByCursor.ts';
import {
    DomainMessage,
    isDomainMessage,
} from 'product-types/dist/message/DomainMessage';


const initialState: PrivateMessagesSchema = {};

export const privateMessagesSlice = createSlice({
    name         : 'private-messages',
    initialState : initialState,
    reducers     : {},
    extraReducers: (builder) => {
        builder.addCase(getOnePrivateDialogues.pending, (state, action) => {
            const currentState     = state[action.meta.arg];
            state[action.meta.arg] = {
                isPending     : true,
                error         : null,
                messages      : currentState?.messages ?? [],
                lastMessageId : '',
                firstMessageId: '',
                hasMoreMessage: currentState?.hasMoreMessage ?? true,
                offset        : currentState?.offset ?? 0,
            };
        });
        builder.addCase(getOnePrivateDialogues.rejected, (state, action) => {
            state[action.meta.arg] = {
                ...state[action.meta.arg],
                isPending: false,
                error    : action.payload,
            };
        });
        builder.addCase(getOnePrivateDialogues.fulfilled, (state, action) => {
            state[action.meta.arg] = {
                ...state[action.meta.arg],
                isPending     : false,
                error         : null,
                messages      : action.payload.messages,
                lastMessageId : action.payload.messages.slice(-1)[0]?.id ?? '',
                hasMoreMessage: action.payload.messages.length === 20,
            };
        });


        builder.addCase(getListPrivateDialogues.fulfilled, (state, action) => {
            console.log(action.payload);
            action.payload.forEach((dialogue) => {
                console.log('Before getListPrivateDialogues', dialogue.id);
                console.log('Before state', state[dialogue.id]?.lastMessageId);
                const storedDialogue = state[dialogue.id];
                if (storedDialogue) {
                    const lastMessage = dialogue.messages.slice(-1)[0];
                    console.log('Stored exist. Last message ->', lastMessage);
                    const lastMessagesEqual = storedDialogue.messages[storedDialogue.messages.length - 1]?.id === lastMessage?.id;
                    if (lastMessage && !lastMessagesEqual) {
                        if (!storedDialogue.messages.find((message) => message.id === lastMessage.id)) {
                            storedDialogue.messages.push(lastMessage);
                            console.log('Change last message from', storedDialogue.lastMessageId, 'to', lastMessage.id);
                            storedDialogue.lastMessageId = lastMessage.id;
                        }
                    }
                } else {
                    const messageId    = dialogue.messages.slice(-1)[0]?.id ?? '';
                    state[dialogue.id] = {
                        isPending     : false,
                        error         : null,
                        messages      : dialogue.messages,
                        lastMessageId : messageId,
                        firstMessageId: '',
                        offset        : 0,
                        hasMoreMessage: true,
                    };
                }
                console.log('After', state[dialogue.id].lastMessageId);
            });
        });


        builder.addCase(sendPrivateMessage.fulfilled, (state, action) => {
            const currentState   = state[action.meta.arg[0]];
            const mergedMessages = state[action.meta.arg[0]]?.messages ?? [];

            if (!mergedMessages.find((message) => message.id === action.payload.message.id)) {
                mergedMessages.push(action.payload.message);
            }

            state[action.meta.arg[0]] = {
                isPending     : currentState?.isPending ?? false,
                error         : currentState?.error ?? null,
                messages      : mergedMessages,
                lastMessageId : action.payload.message.id,
                firstMessageId: currentState?.firstMessageId ?? '',
                offset        : 0,
                hasMoreMessage: currentState?.hasMoreMessage ?? true,
            };
        });
        builder.addCase(sendPrivateMessageNotification.fulfilled, (state, action) => {
            const currentState   = state[action.payload.dialogue.id];
            const mergedMessages = currentState?.messages ?? [];

            if (!mergedMessages.find((message) => message.id === action.payload.message.id)) {
                mergedMessages.push(action.payload.message);
            }

            state[action.payload.dialogue.id] = {
                isPending     : currentState?.isPending ?? false,
                error         : currentState?.error ?? null,
                messages      : mergedMessages,
                lastMessageId : action.payload.message.id,
                firstMessageId: currentState?.firstMessageId ?? '',
                offset        : 0,
                hasMoreMessage: currentState?.hasMoreMessage ?? true,
            };
        });


        builder.addCase(readPrivateMessage.fulfilled, (state, action) => {
            const currentState = state[action.payload.dialogue.id];
            if (currentState) {
                for (let i = 0; i < currentState.messages.length; i++) {
                    if (currentState.messages[i].id === action.payload.message.id) {
                        currentState.messages[i] = action.payload.message;
                        break;
                    }
                }
            }
        });
        builder.addCase(readPrivateMessageNotification.fulfilled, (state, action) => {
            const currentState = state[action.payload.dialogue.id];
            if (currentState) {
                for (let i = 0; i < currentState.messages.length; i++) {
                    if (currentState.messages[i].id === action.payload.message.id) {
                        currentState.messages[i] = action.payload.message;
                        break;
                    }
                }
            }
        });


        builder.addCase(readAllPrivateMessage.fulfilled, (state, action) => {
            const currentState = state[action.payload.dialogue.id];
            if (currentState) {
                for (let i = 0; i < currentState.messages.length; i++) {
                    const message = currentState.messages[i];
                    if (message.author.id === action.payload.dialogue.user.id) {
                        message.read = true;
                    }
                }
            }
        });
        builder.addCase(readAllPrivateMessageNotification.fulfilled, (state, action) => {
            const currentState = state[action.payload.dialogue.id];
            if (currentState) {
                for (let i = 0; i < currentState.messages.length; i++) {
                    const message = currentState.messages[i];
                    if (message.author.id === action.payload.dialogue.user.id) {
                        message.read = true;
                    }
                }
            }
        });


        builder.addCase(updatePrivateMessage.fulfilled, (state, action) => {
            const currentState = state[action.payload.dialogue.id];
            if (currentState) {
                for (let i = 0; i < currentState.messages.length; i++) {
                    if (currentState.messages[i].id === action.payload.previousMessage.id) {
                        currentState.messages[i] = action.payload.newMessage;
                        break;
                    }
                }
            }
        });
        builder.addCase(updatePrivateMessageNotification.fulfilled, (state, action) => {
            const currentState = state[action.payload.dialogue.id];
            if (currentState) {
                for (let i = 0; i < currentState.messages.length; i++) {
                    if (currentState.messages[i].id === action.payload.previousMessage.id) {
                        currentState.messages[i] = action.payload.newMessage;
                        break;
                    }
                }
            }
        });


        builder.addCase(removePrivateMessage.fulfilled, (state, action) => {
            const currentState = state[action.payload.dialogue.id];
            if (currentState) {
                currentState.messages = currentState.messages.filter((message) => message.id !== action.payload.message.id);
            }
        });
        builder.addCase(removePrivateMessageNotification.fulfilled, (state, action) => {
            const currentState = state[action.payload.dialogue.id];
            if (currentState) {
                currentState.messages = currentState.messages.filter((message) => message.id !== action.payload.message.id);
            }
        });


        builder.addCase(getMessagesByCursor.pending, (state, action) => {
            const dialogueId = action.meta.arg[0];
            if (!state[dialogueId]) {
                state[dialogueId] = {
                    isPending     : true,
                    messages      : [],
                    lastMessageId : '',
                    firstMessageId: '',
                    offset        : 0,
                    error         : null,
                    hasMoreMessage: true,
                };
            }
            state[dialogueId].isPending = true;
        });
        builder.addCase(getMessagesByCursor.rejected, (state, action) => {
            const dialogueId            = action.meta.arg[0];
            state[dialogueId].error     = action.payload;
            state[dialogueId].isPending = false;
        });
        builder.addCase(getMessagesByCursor.fulfilled, (state, action) => {
            const payloadMessages                 = action.payload.list.filter(isDomainMessage);
            const dialogueId                      = action.meta.arg[0];
            const mergedMessages: DomainMessage[] = [];

            payloadMessages.forEach((message) => {
                if (!state[dialogueId].messages.find((stateMessage) => stateMessage.id === message.id)) {
                    mergedMessages.push(message);
                }
            });

            state[dialogueId].isPending      = false;
            state[dialogueId].error          = null;
            state[dialogueId].firstMessageId = state[dialogueId].messages[0]?.id ?? '';
            state[dialogueId].lastMessageId  = state[dialogueId].lastMessageId ?? state[dialogueId].messages.slice(-1)[0]?.id ?? payloadMessages.slice(-1)[0]?.id ?? '';
            state[dialogueId].messages       = [ ...mergedMessages, ...state[dialogueId].messages ];
            state[dialogueId].hasMoreMessage = action.payload.list.length === action.meta.arg[1].limit;
        });
    },
});

export const {
                 actions: privateMessagesActions,
                 reducer: privateMessagesReducer,
             } = privateMessagesSlice;