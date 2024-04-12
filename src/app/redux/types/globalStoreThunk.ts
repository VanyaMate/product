import { ThunkDispatch } from '@reduxjs/toolkit';
import { GlobalStoreSchema } from '@/app';


export type GlobalStoreThunk = ThunkDispatch<GlobalStoreSchema, any, any>;