import { Dispatch, SetStateAction, useMemo, useState } from 'react';


export interface IModalController {
    opened: boolean;
    setOpened: Dispatch<SetStateAction<boolean>>;
}

export const useModalController = function (): IModalController {
    const [ opened, setOpened ] = useState<boolean>(false);
    return useMemo(() => ({
        opened, setOpened,
    }), [ opened ]);
};