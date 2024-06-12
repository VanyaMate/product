import {
    PrivateDialoguesSchema,
} from '@/app/redux/slices/private-dialogues/types/private-dialogues.schema.ts';
import { createSlice } from '@reduxjs/toolkit';
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


/**
 * TODO:
 *
 * Эксперемент: Сделать неоптимизированно
 * 1. Все диалоги будут в одном месте (dialogues) (обычные и архивные)
 * 2. Сообщения так же хранить в диалогах (жесть)
 *
 * Проверить на сколько это ужасно.
 * */

const initialState: PrivateDialoguesSchema = {
    isPending      : false,
    error          : null,
    dialogues      : [],
    dialoguesStatus: {},
    withUser       : {},
};

export const privateDialogues = createSlice({
    name         : 'private-dialogues',
    initialState : initialState,
    reducers     : {},
    extraReducers: (builder) => {
        // getListPrivateDialogues
        builder.addCase(getListPrivateDialogues.fulfilled, (state, action) => {
            state.isPending = false;
            state.error     = null;
            state.dialogues = action.payload;
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
            state.withUser[action.meta.arg]          = {
                isPending: false,
                created  : true,
                error    : null,
            };
            state.dialoguesStatus[action.payload.id] = {
                isPending: false,
                error    : null,
            };
            state.dialogues                          = [ ...state.dialogues.map((dialogue) =>
                (dialogue.id === action.payload.id)
                ? action.payload
                : dialogue,
            ) ];
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
            state.dialoguesStatus[action.payload.id] = {
                isPending: false,
                error    : null,
            };
            state.dialogues                          = [ ...state.dialogues.map((dialogue) =>
                (dialogue.id === action.payload.id)
                ? { ...dialogue, meArchived: true }
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
            delete state.dialoguesStatus[action.payload.id];
            delete state.withUser[action.payload.user.id];
            state.dialogues = state.dialogues.filter((dialogue) => dialogue.id !== action.meta.arg);
        });
    },
});

export const {
                 actions: privateDialoguesActions,
                 reducer: privateDialoguesReducer,
             } = privateDialogues;