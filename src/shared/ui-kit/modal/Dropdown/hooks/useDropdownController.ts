import {
    Dispatch,
    SetStateAction,
    useLayoutEffect,
    useState,
} from 'react';
import { keyboardClose } from '@/shared/lib/react/keyboardClose.ts';


export type UseDropdownController = {
    opened: boolean;
    setOpened: Dispatch<SetStateAction<boolean>>;
}

export const useDropdownController = function (): UseDropdownController {
    const [ opened, setOpened ] = useState<boolean>(false);

    useLayoutEffect(() => {
        if (opened) {
            keyboardClose(opened, setOpened);

            const body         = document.body;
            const main         = document.querySelector('main');
            const closeHandler = () => setOpened(false);

            window.addEventListener('resize', closeHandler);
            window.addEventListener('scroll', closeHandler);
            main.addEventListener('scroll', closeHandler);
            body.addEventListener('scroll', closeHandler);
            return () => {
                window.removeEventListener('resize', closeHandler);
                window.removeEventListener('scroll', closeHandler);
                main.removeEventListener('scroll', closeHandler);
                body.removeEventListener('scroll', closeHandler);
            };
        }
    }, [ opened ]);

    return { opened, setOpened };
};