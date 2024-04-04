import React, { useCallback, useEffect, useState } from 'react';
import { TestComponentContext } from './TestComponentContext';


export type TestComponentProviderProps = { children: React.ReactNode };

const TestComponentProvider: React.FC<TestComponentProviderProps> = ({ children }) => {
    const [ val, setVal ] = useState<number>(0);
    console.log('Update val', val);

    useEffect(() => {
        console.log('val was updated', val);
    }, [ val ]);

    const setValueCallback = useCallback((val: number) => {
        setVal(val);
        console.log('set value callback', val);
    }, []);

    return (
        <TestComponentContext.Provider value={ { val, setVal: setValueCallback } }>
            <div>
                <h1>provider: { val }</h1>
                { children }
            </div>
        </TestComponentContext.Provider>
    );
};

export default React.memo(TestComponentProvider);