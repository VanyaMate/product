import { Dispatch, SetStateAction } from 'react';


export const keyboardClose = function (opened: boolean, setOpened: Dispatch<SetStateAction<boolean>>) {
    if (opened) {
        const keyboardHandler = function (event: KeyboardEvent) {
            if (event.code === 'Escape') {
                setOpened(false);
            }
        };

        window.addEventListener('keydown', keyboardHandler);
        return () => window.removeEventListener('keydown', keyboardHandler);
    }
};