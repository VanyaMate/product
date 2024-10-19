import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { BaseSyntheticEvent } from 'react';


export type ReactHookFormHandlerSubmit<T> = (onValid: SubmitHandler<T>, onInvalid?: SubmitErrorHandler<T>) => (e?: BaseSyntheticEvent) => Promise<void>;