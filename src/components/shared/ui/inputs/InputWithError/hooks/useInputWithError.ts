import {
    ChangeEvent,
    ChangeEventHandler, MutableRefObject,
    useCallback,
    useMemo,
    useRef,
    useState,
} from 'react';


export type UseInputWithErrorProps = {
    // Используется для указания инпуту кого либо названия и используется в useForm
    name: string;
    validationMethod?: (inputValue: string) => string;
    debounce?: number;
}

export interface IUseInputWithError {
    isValid: boolean;
    errorMessage: string;
    value: MutableRefObject<string>;
    name: string;
    inputRef: MutableRefObject<HTMLInputElement | null>;
    onChangeHandler: ChangeEventHandler<HTMLInputElement>;
}

export const useInputWithError = function (props: UseInputWithErrorProps): IUseInputWithError {
    // Сообщение об ошибке
    const [ errorMessage, setErrorMessage ] = useState<string>('');

    // Состояние валидности (сокращение для errorMessage.length === 0)
    const isValid = useMemo<boolean>(() => errorMessage.length === 0, [ errorMessage ]);

    // Ref который хранит состояние input.value
    const value = useRef<string>('');

    // Ref который хранит ссылку на input для возможного фокуса
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Ref который хранит debounce timer
    const debounceTimer = useRef<ReturnType<typeof setTimeout>>();

    const validateCurrentValue = useCallback(() => {
        if (props.validationMethod) {
            clearTimeout(debounceTimer.current);
            if (props.debounce) {
                setErrorMessage('');
                debounceTimer.current = setTimeout(() => {
                    const validationResult: string = props.validationMethod!(value.current);
                    setErrorMessage(validationResult);
                }, props.debounce);
            } else {
                const validationResult: string = props.validationMethod!(value.current);
                setErrorMessage(validationResult);
            }
        }
    }, [ props.debounce, props.validationMethod ]);

    // Функция, которая навешивается на onChange в input
    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        value.current = event.target.value;
        validateCurrentValue();
    }, [ validateCurrentValue ]);

    return {
        value,
        isValid,
        errorMessage,
        onChangeHandler,
        inputRef,
        name: props.name,
    };
};