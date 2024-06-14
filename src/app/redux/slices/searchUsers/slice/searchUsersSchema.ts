import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    SearchUsersSchema,
} from '@/app/redux/slices/searchUsers/types/types.ts';
import { DomainSearchItem } from 'product-types/dist/search/DomainSearchItem';
import {
    fetchSearchUsersByLoginStart,
} from '@/app/redux/slices/searchUsers/thunks/fetchProfilesByLoginStart.ts';
import { logout } from '@/app/redux/slices/auth/thunks/logout/logout.ts';
import {
    isDomainUserWithPermissions,
} from 'product-types/dist/user/DomainUserWithPermissions';


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
            state.users = action.payload.list.filter(isDomainUserWithPermissions);
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
            state.users     = action.payload.list.filter(isDomainUserWithPermissions);
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

        builder.addCase(logout.fulfilled, (state) => {
            state.users  = [];
            state.count  = 0;
            state.error  = null;
            state.offset = 0;
        });
    },
});

export const {
                 actions: searchUsersActions,
                 reducer: searchUsersReducer,
             } = searchUsersSchema;