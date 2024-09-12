import { Dispatch, SetStateAction, useLayoutEffect, useState } from 'react';


export type UseTitle = Dispatch<SetStateAction<string>>;

export const useTitle = function (value: string): UseTitle {
    const [ title, setTitle ] = useState(value);

    useLayoutEffect(() => {
        document.title = title;
    }, [ title ]);

    return setTitle;
};