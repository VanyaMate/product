import { Dispatch, SetStateAction, useLayoutEffect, useState } from 'react';


export type UseTitle = Dispatch<SetStateAction<string>>;

export const useTitle = function (value?: string): UseTitle {
    const [ title, setTitle ] = useState(value);

    useLayoutEffect(() => {
        if (value && value !== title) {
            setTitle(value);
        }

        document.title = title;
    }, [ value, title ]);

    return setTitle;
};