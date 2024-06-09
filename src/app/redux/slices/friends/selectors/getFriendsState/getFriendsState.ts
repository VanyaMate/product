import { GlobalStoreSchema } from '@/app/redux/types/global-store-types.ts';


export const getFriendsState = (state: GlobalStoreSchema) => state.friends ?? undefined;