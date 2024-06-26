import {
    PrivateDialoguesSchema,
} from '@/app/redux/slices/private-dialogues/types/private-dialogues.schema.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    getListPrivateDialogues,
} from '@/app/redux/slices/private-dialogues/thunks/getListPrivateDialogues/getListPrivateDialogues.ts';
import {
    getOnePrivateDialogues,
} from '@/app/redux/slices/private-dialogues/thunks/getOnePrivateDialogues/getOnePrivateDialogues.ts';
import {
    createPrivateDialogue,
} from '@/app/redux/slices/private-dialogues/thunks/createPrivateDialogue/createPrivateDialogue.ts';
import {
    archivePrivateDialogue,
} from '@/app/redux/slices/private-dialogues/thunks/archivePrivateDialogue/archivePrivateDialogue.ts';
import {
    removePrivateDialogue,
} from '@/app/redux/slices/private-dialogues/thunks/removePrivateDialogue/removePrivateDialogue.ts';
import {
    DomainPrivateDialogueFull,
} from 'product-types/dist/private-dialogue/DomainPrivateDialogueFull';
import {
    DomainMessage,
} from 'product-types/dist/message/DomainMessage';
import {
    sendPrivateMessage,
} from '@/app/redux/slices/private-messages/thunks/sendPrivateMessage.ts';
import {
    unArchivePrivateDialogue,
} from '@/app/redux/slices/private-dialogues/thunks/unArchivePrivateDialogue/unArchivePrivateDialogue.ts';


const initialState: PrivateDialoguesSchema = {
    isPending      : false,
    error          : null,
    dialogues      : [],
    dialoguesStatus: {},
    dialogueSearch : {},
    withUser       : {},
};

export const privateDialogues = createSlice({
    name         : 'private-dialogues',
    initialState : initialState,
    reducers     : {
        addDialogue (state, action: PayloadAction<DomainPrivateDialogueFull>) {
            state.dialogues.push(action.payload);
            state.dialoguesStatus[action.payload.id] = {
                isPending: false,
                error    : null,
            };
            state.withUser[action.payload.user.id]   = {
                isPending: false,
                error    : null,
                created  : true,
            };
        },
        addMessageToDialogue (state, action: PayloadAction<DomainMessage>) {
            const dialogue = state.dialogues.find((dialogue) => dialogue.id === action.payload.dialogueId);
            if (dialogue && !state.dialogueSearch[dialogue.id]) {
                if (!dialogue.messages.some((message) => message.id === action.payload.id)) {
                    dialogue.messages.push(action.payload);
                }
            }
        },
    },
    extraReducers: (builder) => {
        // getListPrivateDialogues
        builder.addCase(getListPrivateDialogues.fulfilled, (state, action) => {
            state.isPending       = false;
            state.error           = null;
            const loadedDialogues = state.dialogues;
            state.dialogues       = action.payload;

            loadedDialogues.forEach((dialogue) => {
                const loadedDialogue = state.dialogues.find((stateDialogue) => stateDialogue.id === dialogue.id);
                if (loadedDialogue) {
                    loadedDialogue.messages = dialogue.messages;
                }
            });

            action.payload.forEach((dialogue) => {
                state.dialoguesStatus[dialogue.id] = {
                    isPending: false,
                    error    : null,
                };
                state.withUser[dialogue.user.id]   = {
                    isPending: false,
                    created  : true,
                    error    : null,
                };
            });
        });
        builder.addCase(getListPrivateDialogues.pending, (state) => {
            state.isPending       = true;
            state.error           = null;
            state.dialoguesStatus = {};
            state.dialogues       = [];
            state.withUser        = {};
        });
        builder.addCase(getListPrivateDialogues.rejected, (state, action) => {
            state.isPending = false;
            state.error     = action.payload;
        });


        // getOnePrivateDialogues
        builder.addCase(getOnePrivateDialogues.pending, (state, action) => {
            state.dialoguesStatus[action.meta.arg] = {
                isPending: true,
                error    : null,
            };
        });
        builder.addCase(getOnePrivateDialogues.rejected, (state, action) => {
            state.dialoguesStatus[action.meta.arg] = {
                isPending: false,
                error    : action.payload,
            };
        });
        builder.addCase(getOnePrivateDialogues.fulfilled, (state, action) => {
            state.dialoguesStatus[action.meta.arg] = {
                isPending: false,
                error    : null,
            };
            state.dialogues                        = [ ...state.dialogues.map((dialogue) =>
                (dialogue.id === action.payload.id)
                ? action.payload
                : dialogue,
            ) ];
            state.withUser[action.payload.user.id] = {
                isPending: false,
                created  : true,
                error    : null,
            };
        });

        // createPrivateDialogue
        builder.addCase(createPrivateDialogue.pending, (state, action) => {
            state.withUser[action.meta.arg] = {
                isPending: true,
                created  : false,
                error    : null,
            };
        });
        builder.addCase(createPrivateDialogue.rejected, (state, action) => {
            state.withUser[action.meta.arg] = {
                isPending: false,
                created  : false,
                error    : action.payload,
            };
        });
        builder.addCase(createPrivateDialogue.fulfilled, (state, action) => {
            state.withUser[action.meta.arg]                   = {
                isPending: false,
                created  : true,
                error    : null,
            };
            state.dialoguesStatus[action.payload.dialogue.id] = {
                isPending: false,
                error    : null,
            };

            let exist: boolean = false;
            const dialogues    = state.dialogues.map((dialogue) => {
                    if (dialogue.id === action.payload.dialogue.id) {
                        exist = true;
                        return action.payload.dialogue;
                    } else {
                        return dialogue;
                    }
                },
            );

            if (!exist) {
                dialogues.push(action.payload.dialogue);
            }

            state.dialogues = dialogues;
        });

        // archivePrivateDialogue
        builder.addCase(archivePrivateDialogue.pending, (state, action) => {
            state.dialoguesStatus[action.meta.arg] = {
                isPending: true,
                error    : null,
            };
        });
        builder.addCase(archivePrivateDialogue.rejected, (state, action) => {
            state.dialoguesStatus[action.meta.arg] = {
                isPending: false,
                error    : action.payload,
            };
        });
        builder.addCase(archivePrivateDialogue.fulfilled, (state, action) => {
            state.dialoguesStatus[action.payload.dialogue.id] = {
                isPending: false,
                error    : null,
            };
            state.dialogues                                   = [ ...state.dialogues.map((dialogue) =>
                (dialogue.id === action.payload.dialogue.id)
                ? { ...dialogue, meArchived: true }
                : dialogue,
            ) ];
        });

        // unArchivePrivateDialogue
        builder.addCase(unArchivePrivateDialogue.pending, (state, action) => {
            state.dialoguesStatus[action.meta.arg] = {
                isPending: true,
                error    : null,
            };
        });
        builder.addCase(unArchivePrivateDialogue.rejected, (state, action) => {
            state.dialoguesStatus[action.meta.arg] = {
                isPending: false,
                error    : action.payload,
            };
        });
        builder.addCase(unArchivePrivateDialogue.fulfilled, (state, action) => {
            state.dialoguesStatus[action.payload.dialogue.id] = {
                isPending: false,
                error    : null,
            };
            state.dialogues                                   = [ ...state.dialogues.map((dialogue) =>
                (dialogue.id === action.payload.dialogue.id)
                ? { ...dialogue, meArchived: false }
                : dialogue,
            ) ];
        });

        // removePrivateDialogue
        builder.addCase(removePrivateDialogue.pending, (state, action) => {
            state.dialoguesStatus[action.meta.arg] = {
                isPending: true,
                error    : null,
            };
        });
        builder.addCase(removePrivateDialogue.rejected, (state, action) => {
            state.dialoguesStatus[action.meta.arg] = {
                isPending: false,
                error    : action.payload,
            };
        });
        builder.addCase(removePrivateDialogue.fulfilled, (state, action) => {
            delete state.dialoguesStatus[action.payload.dialogue.id];
            delete state.withUser[action.payload.dialogue.user.id];
            state.dialogues = state.dialogues.filter((dialogue) => dialogue.id !== action.meta.arg);
        });

        builder.addCase(sendPrivateMessage.fulfilled, (state, action) => {
            const dialogue = state.dialogues.find((dialogue) => dialogue.id === action.payload.dialogue.id);
            if (dialogue && !state.dialogueSearch[dialogue.id]) {
                if (!dialogue.messages.some((message) => message.id === action.payload.message.id)) {
                    dialogue.messages.push(action.payload.message);
                }
            }
        });
    },
});

export const {
                 actions: privateDialoguesActions,
                 reducer: privateDialoguesReducer,
             } = privateDialogues;