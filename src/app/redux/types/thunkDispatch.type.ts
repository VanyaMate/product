import { ThunkDispatch } from '@reduxjs/toolkit';
import { GlobalStoreSchema } from '@/app';


export type ThunkDispatchType = ThunkDispatch<GlobalStoreSchema, any, any>;