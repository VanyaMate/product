import { FormEvent, FormEventHandler, useCallback, useMemo, useState } from 'react';
import { IUseInputWithError } from '@/shared/ui-kit';


export type UseFormProps<T> = {
    inputs: IUseInputWithError[];
    onSubmit: (data: T) => Promise<void>;
    onError?: (error: string) => void;
}

export interface IUseForm {
    pending: boolean;
    error: string;
    canBeSubmitted: boolean;
    onSubmitHandler: FormEventHandler<HTMLFormElement>;
}

export type FormReturnType = Record<string, string | number | boolean>;

export const useForm = function <T extends FormReturnType> (props: UseFormProps<T>): IUseForm {
    const [ pending, setPending ] = useState<boolean>(false);
    const [ error, setError ]     = useState<string>('');
    const canBeSubmitted          = useMemo<boolean>(() => {
        return props.inputs.every((input) => input.isValid && !input.validationAwait);
    }, [ props.inputs ]);

    const onSubmitHandler = useCallback<FormEventHandler<HTMLFormElement>>((event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data: FormReturnType = {};
        for (let i = 0; i < props.inputs.length; i++) {
            const input = props.inputs[i];
            if (!input.isValid) {
                input.inputRef.current?.focus();
                return;
            }
            data[input.name] = input.value.current;
        }
        setPending(true);
        setError('');
        props.onSubmit(<T>data)
            .catch((error: Error) => {
                setError(error.message);
                props.onError && props.onError(error.message);
            })
            .finally(() => setPending(false));
    }, [ props ]);

    return {
        onSubmitHandler,
        error,
        pending,
        canBeSubmitted,
    };
};