import { useCallback, useMemo } from 'react';
import { IUseInput } from '@/shared/ui-kit';


export interface IUseInputCompare {
    valid: boolean;
    nextError: string;
    getNextError: () => string;
}

export const useInputCompose = function (...inputs: IUseInput[]): IUseInputCompare {
    const valid        = useMemo<boolean>(() => inputs.every((input) => input.valid), [ inputs ]);
    const nextError    = useMemo<string>(() => inputs.find((input) => input.errorMessage && !input.empty)?.errorMessage ?? '', [ inputs ]);
    const getNextError = useCallback((): string => {
        for (let i = 0; i < inputs.length; i++) {
            if (!inputs[i].valid) {
                inputs[i].inputRef.current?.focus();
                return inputs[i].errorMessage;
            }
        }
        return '';
    }, [ inputs ]);

    return {
        valid, getNextError, nextError,
    };
};