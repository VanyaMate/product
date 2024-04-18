import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { keyboardClose } from '@/shared/lib/react/keyboardClose.ts';


export interface IModalController {
    opened: boolean;
    setOpened: Dispatch<SetStateAction<boolean>>;
}

export const useModalController = function (): IModalController {
    const [ opened, setOpened ] = useState<boolean>(false);

    useEffect(() => {
        return keyboardClose(opened, setOpened);
    }, [ opened ]);

    return useMemo(() => ({
        opened, setOpened,
    }), [ opened ]);
};