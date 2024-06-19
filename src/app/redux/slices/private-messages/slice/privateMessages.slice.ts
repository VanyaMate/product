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


const initialState: PrivateMessagesSchema = {};

export const privateMessagesSlice = createSlice({
    name         : 'private-messages',
    initialState : initialState,
    reducers     : {},
    extraReducers: (builder) => {
        builder.addCase(getOnePrivateDialogues.pending, (state, action) => {
            const currentState     = state[action.meta.arg];
            state[action.meta.arg] = {
                isPending: true,
                error    : null,
                messages : currentState.messages ?? [],
                offset   : currentState.offset ?? 0,
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
            const mergedMessages = state[action.meta.arg].messages;

            action.payload.messages.forEach((message) => {
                if (!mergedMessages.find((mergedMessage) => mergedMessage.id === message.id)) {
                    mergedMessages.push(message);
                }
            });

            state[action.meta.arg] = {
                ...state[action.meta.arg],
                isPending: false,
                error    : null,
                messages : mergedMessages,
            };
        });


        builder.addCase(getListPrivateDialogues.fulfilled, (state, action) => {
            action.payload.forEach((dialogue) => {
                const storedDialogue = state[dialogue.id];
                if (storedDialogue) {
                    const lastMessage       = dialogue.messages[0];
                    const lastMessagesEqual = storedDialogue.messages[storedDialogue.messages.length - 1]?.id !== lastMessage?.id;
                    if (lastMessage && lastMessagesEqual) {
                        storedDialogue.messages.push(lastMessage);
                    }
                } else {
                    state[dialogue.id] = {
                        isPending: false,
                        error    : null,
                        messages : dialogue.messages,
                        offset   : 0,
                    };
                }
            });
        });


        builder.addCase(sendPrivateMessage.fulfilled, (state, action) => {
            const currentState   = state[action.meta.arg[0]];
            const mergedMessages = state[action.meta.arg[0]]?.messages ?? [];

            if (!mergedMessages.find((message) => message.id === action.payload.message.id)) {
                mergedMessages.push(action.payload.message);
            }

            state[action.meta.arg[0]] = {
                isPending: currentState.isPending ?? false,
                error    : currentState.error ?? null,
                messages : mergedMessages,
                offset   : 0,
            };
        });
        builder.addCase(sendPrivateMessageNotification.fulfilled, (state, action) => {
            const currentState   = state[action.payload.dialogue.id];
            const mergedMessages = currentState?.messages ?? [];

            if (!mergedMessages.find((message) => message.id === action.payload.message.id)) {
                mergedMessages.push(action.payload.message);
            }

            state[action.payload.dialogue.id] = {
                isPending: currentState.isPending ?? false,
                error    : currentState.error ?? null,
                messages : mergedMessages,
                offset   : 0,
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
    },
});