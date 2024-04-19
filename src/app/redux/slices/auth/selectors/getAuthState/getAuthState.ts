import { GlobalStoreSchema } from '@/app/redux/types/global-store-types.ts';


export const getAuthState = (state: GlobalStoreSchema) => state.auth ?? undefined;