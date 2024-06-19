import {
    PrivateMessagesSearchSchema,
} from '@/app/redux/slices/private-messages-search/types/private-messages-search.schema.ts';
import { createSlice } from '@reduxjs/toolkit';
import {
    searchPrivateMessages,
} from '@/app/redux/slices/private-messages-search/thunks/searchPrivateMessages.ts';
import { isDomainMessage } from 'product-types/dist/message/DomainMessage';
import {
    removePrivateMessageSearch,
} from '@/app/redux/slices/private-messages-search/thunks/removePrivateMessageSearch.ts';


const initialState: PrivateMessagesSearchSchema = {};

export const privateMessageSlice = createSlice({
    name         : 'private-messages-slice',
    initialState : initialState,
    reducers     : {},
    extraReducers: (builder) => {
        builder.addCase(searchPrivateMessages.pending, (state, action) => {
            const [ id, options ] = action.meta.arg;
            const currentState    = state[id];
            if (currentState) {
                currentState.isPending = false;
                currentState.error     = null;
                currentState.limit     = options.limit;
                currentState.offset    = options.offset;

                if (currentState.query !== options.query) {
                    currentState.query          = options.query;
                    currentState.searchMessages = [];
                }
            } else {
                state[id] = {
                    isPending     : true,
                    error         : null,
                    searchMessages: [],
                    count         : 0,
                    offset        : options.offset,
                    query         : options.query,
                    limit         : options.limit,
                };
            }
        });
        builder.addCase(searchPrivateMessages.rejected, (state, action) => {
            const [ id ]       = action.meta.arg;
            const currentState = state[id];

            currentState.isPending      = false;
            currentState.error          = action.payload;
            currentState.searchMessages = [];
            currentState.count          = 0;
        });
        builder.addCase(searchPrivateMessages.fulfilled, (state, action) => {
            const [ id, options ] = action.meta.arg;
            const currentState    = state[id];

            currentState.isPending = false;
            currentState.error     = null;
            currentState.count     = action.payload.count;

            if (currentState.query === options.query) {
                currentState.searchMessages = [ ...currentState.searchMessages, ...action.payload.list.filter(isDomainMessage) ];
            } else {
                currentState.searchMessages = action.payload.list.filter(isDomainMessage);
            }
        });


        builder.addCase(removePrivateMessageSearch.pending, (state, action) => {
            delete state[action.meta.arg];
        });
    },
});