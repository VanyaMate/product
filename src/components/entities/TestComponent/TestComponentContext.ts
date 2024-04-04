import { createContext } from 'react';


export const TestComponentContext = createContext<{
    val: number,
    setVal: (val: number) => void
}>({
    val   : 0,
    setVal: () => {
        console.log('context log');
    },
});