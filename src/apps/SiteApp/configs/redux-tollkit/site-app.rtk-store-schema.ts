import {
    CounterSchema,
} from '@/components/entities/_temp_/Counter/model/types/counterSchema.ts';
import { UserSchema } from '@/components/entities/users/model/types/userSchema.ts';


export interface SiteAppRtkStoreSchema {
    counter: CounterSchema;
    user: UserSchema;
}