import { FormEvent, FormEventHandler, useCallback, useState } from 'react';

import {
    IUseInputWithError,
} from '@/components/shared/ui/inputs/InputWithError/hooks/useInputWithError.ts';


export type UseFormProps<T> = {
    inputs: IUseInputWithError[];
    onSubmit: (data: T) => Promise<void>;
}

export interface IUseForm {
    pending: boolean;
    error: string;
    onSubmitHandler: FormEventHandler<HTMLFormElement>;
}

export type FormReturnType = Record<string, string | number | boolean>;

export const useForm = function <T extends FormReturnType> (props: UseFormProps<T>) {
    const [ pending, setPending ] = useState<boolean>(false);
    const [ error, setError ]     = useState<string>('');

    console.log('use form rerender');

    const onSubmitHandler = useCallback<FormEventHandler<HTMLFormElement>>((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data: FormReturnType = {};
        for (let i = 0; i < props.inputs.length; i++) {
            const input = props.inputs[i];
            if (!input.isValid) {
                input.inputRef.current?.focus();
                break;
            }
            data[input.name] = input.value.current;
        }
        setPending(true);
        setError('');
        props.onSubmit(<T>data)
            .catch(setError)
            .finally(() => setPending(false));
    }, [ props ]);

    return {
        onSubmitHandler,
        error,
        pending,
    };
};