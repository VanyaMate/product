import { MutableRefObject, useEffect, useRef, useState } from 'react';


export type InputValid = [ boolean, string ];

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
    const [ valid, setValid ]               = useState<boolean>(true);
    const [ errorMessage, setErrorMessage ] = useState<string>('');
    const [ empty, setEmpty ]               = useState<boolean>(value.current.trim().length === 0);

    const getValue = function () {
        return value.current;
    };

    const changeValue = function (newValue: string) {
        if (inputRef.current) {
            inputRef.current.value = newValue;
            onChange();
        }
    };

    const onChange = function () {
        value.current = inputRef.current!.value;

        if (props?.validationMethod) {
            const validationResult = props?.validationMethod(value.current);
            if (validationResult !== errorMessage) {
                setValid(!validationResult);
                setErrorMessage(validationResult);
            }
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

    useEffect(() => {
        onChange();
    }, [ props ]);

    return {
        valid, errorMessage, empty, getValue, changeValue, inputRef, onChange,
    };
};