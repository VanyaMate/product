import { Dispatch, SetStateAction, useMemo, useState } from 'react';


export interface IModelController {
    opened: boolean;
    setOpened: Dispatch<SetStateAction<boolean>>;
}

export const useModalController = function (): IModelController {
    const [ opened, setOpened ] = useState<boolean>(false);
    return useMemo(() => ({
        opened, setOpened,
    }), [ opened ]);
};