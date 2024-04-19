import { GlobalStoreSchema } from "@/app/redux/types/global-store-types";

export const getUserState = (state: GlobalStoreSchema) => state.user ?? undefined;