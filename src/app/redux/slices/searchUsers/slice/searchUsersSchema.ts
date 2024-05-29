import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    SearchUsersSchema,
} from '@/app/redux/slices/searchUsers/types/types.ts';
import { DomainSearchItem } from 'product-types/dist/search/DomainSearchItem';
import { isDomainUser } from 'product-types/dist/user/DomainUser';
import {
    fetchSearchUsersByLoginStart,
} from '@/app/redux/slices/searchUsers/thunks/fetchProfilesByLoginStart.ts';


const initialState: SearchUsersSchema = {
    isPending: false,
    error    : null,
    users    : [],
    count    : 0,
    limit    : 10,
    offset   : 0,
    query    : '',
};

export const searchUsersSchema = createSlice({
    name         : 'searchUsers',
    initialState : initialState,
    reducers     : {
        setData (state, action: PayloadAction<DomainSearchItem>) {
            state.users = action.payload.list.filter(isDomainUser);
            state.count = action.payload.count;
        },
        setQuery (state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
        setLimit (state, action: PayloadAction<number>) {
            state.limit = action.payload;
        },
        setOffset (state, action: PayloadAction<number>) {
            state.offset = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSearchUsersByLoginStart.fulfilled, (state, action) => {
            state.isPending = false;
            state.error     = null;
            state.users     = action.payload.list.filter(isDomainUser);
            state.count     = action.payload.count;
        });
        builder.addCase(fetchSearchUsersByLoginStart.pending, (state, action) => {
            state.isPending = true;
            state.error     = null;
            state.query     = action.meta.arg.query;
            state.limit     = action.meta.arg.limit;
            state.offset    = action.meta.arg.offset;
        });
        builder.addCase(fetchSearchUsersByLoginStart.rejected, (state, action) => {
            state.isPending = false;
            state.error     = action.payload;
            state.users     = [];
            state.count     = 0;
        });
    },
});

export const {
                 actions: searchUsersActions,
                 reducer: searchUsersReducer,
             } = searchUsersSchema;