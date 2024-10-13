import { DeepRequired, FieldErrorsImpl, GlobalError } from 'react-hook-form';


export type RhfErrors<T> =
    Partial<FieldErrorsImpl<DeepRequired<T>>>
    & { root?: Record<string, GlobalError> & GlobalError }