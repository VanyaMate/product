import { MutableRefObject, useEffect, useRef, useState } from 'react';


export type UseInputProps = {
    defaultValue?: string;
    debounce?: number;
    validationMethod?: (value: string) => string;
}

export interface IUseInput {
    valid: boolean;
    errorMessage: string;
    empty: boolean;
    getValue: () => string;
    changeValue: (value: string) => void;
    onChange: () => void;
    inputRef: MutableRefObject<HTMLInputElement | null>;
}

export const useInput = function (props?: UseInputProps): IUseInput {
    const value                             = useRef<string>(props?.defaultValue ?? '');
    const inputRef                          = useRef<HTMLInputElement | null>(null);
    const validationResult: string          = props?.validationMethod?.(value.current) ?? '';
    const filled: boolean                   = value.current.trim().length === 0;
    const debounceTimer                     = useRef<ReturnType<typeof setTimeout>>();
    const [ valid, setValid ]               = useState<boolean>(!validationResult.trim().length);
    const [ errorMessage, setErrorMessage ] = useState<string>(
        filled ? validationResult : '',
    );
    const [ empty, setEmpty ]               = useState<boolean>(!filled);

    const getValue = function () {
        return value.current;
    };

    const changeValue = function (newValue: string) {
        if (inputRef.current) {
            inputRef.current.value = newValue;
            onChange();
        }
    };

    const updateState = function () {
        value.current = inputRef.current!.value;

        if (props?.validationMethod) {
            clearTimeout(debounceTimer.current);
            debounceTimer.current = setTimeout(() => {
                const validationResult = props.validationMethod!(value.current) ?? '';
                setErrorMessage(validationResult);
                setValid(!validationResult);
            }, props.debounce ?? 0);
        } else if (inputRef.current?.required) {
            if (value.current.trim().length === 0) {
                setValid(false);
                setErrorMessage('Не может быть пустым');
            } else {
                setValid(true);
                setErrorMessage('');
            }
        }

        setEmpty(value.current.trim().length === 0);
    };

    const onChange = function () {
        setErrorMessage('');
        updateState();
    };

    useEffect(() => {
        updateState();
    }, [ props ]);

    return {
        valid, errorMessage, empty, getValue, changeValue, inputRef, onChange,
    };
};