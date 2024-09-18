import {
    Dispatch,
    SetStateAction,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';


export type UsePageTitle = Dispatch<SetStateAction<string>>;

export const usePageTitle = function (value?: string): UsePageTitle {
    const [ title, setTitle ] = useState(value);
    const lastValue           = useRef(value);

    useLayoutEffect(() => {
        if (value && value !== lastValue.current) {
            setTitle(value);
        }

        document.title = title;
    }, [ title, value ]);

    return setTitle;
};