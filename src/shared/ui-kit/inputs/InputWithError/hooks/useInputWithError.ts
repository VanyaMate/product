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
    onChangeHandler?: (value: string) => void;
}

export interface IUseInputWithError {
    isValid: boolean;
    validationAwait: boolean;
    errorMessage: string;
    value: MutableRefObject<string>;
    name: string;
    inputRef: MutableRefObject<HTMLInputElement | null>;
    onChangeHandler: ChangeEventHandler<HTMLInputElement>;
}

export const useInputWithError = function (props: UseInputWithErrorProps): IUseInputWithError {
    // Состояние необходимости провалидировать данные
    const [ validationAwait, setValidationAwait ] = useState<boolean>(false);

    // Сообщение об ошибке
    const [ errorMessage, setErrorMessage ] = useState<string>(
        props.validationMethod ? props.validationMethod('') : '',
    );

    // Состояние валидности (сокращение для errorMessage.length === 0)
    const isValid = useMemo<boolean>(() => errorMessage.length === 0, [ errorMessage ]);

    // Ref который хранит состояние input.value
    const value = useRef<string>('');

    // Ref который хранит ссылку на input для возможного фокуса
    const inputRef = useRef<HTMLInputElement | null>(null);

    // Ref который хранит debounce timer
    const debounceTimer = useRef<ReturnType<typeof setTimeout>>();

    // Функция, которая запускает валидацию
    const validateCurrentValue = useCallback(async () => {
        return new Promise((resolve, reject) => {
            clearTimeout(debounceTimer.current);

            if (props.validationMethod) {
                setValidationAwait(true);
                if (props.debounce) {
                    setErrorMessage('');
                    debounceTimer.current = setTimeout(() => {
                        const validationResult: string = props.validationMethod!(value.current);
                        setErrorMessage(validationResult);
                        setValidationAwait(false);

                        if (validationResult === '') {
                            resolve(value.current);
                        } else {
                            reject(validationResult);
                        }
                    }, props.debounce);
                } else {
                    const validationResult: string = props.validationMethod!(value.current);
                    setErrorMessage(validationResult);
                    setValidationAwait(false);

                    if (validationResult === '') {
                        resolve(value.current);
                    } else {
                        reject(validationResult);
                    }
                }
            } else if (props.debounce) {
                setValidationAwait(true);
                clearTimeout(debounceTimer.current);
                debounceTimer.current = setTimeout(() => {
                    setValidationAwait(false);
                    resolve(value.current);
                }, props.debounce);
            } else {
                resolve(value.current);
            }
        });
    }, [ props.debounce, props.validationMethod ]);

    // Функция, которая навешивается на onChange в input
    const onChangeHandler: ChangeEventHandler<HTMLInputElement> = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        value.current = event.target.value;
        validateCurrentValue().then(props.onChangeHandler);
    }, [ props.onChangeHandler, validateCurrentValue ]);

    return {
        value,
        isValid,
        validationAwait,
        errorMessage,
        onChangeHandler,
        inputRef,
        name: props.name,
    };
};