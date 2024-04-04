import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {
    CounterSchema
} from '@/components/entities/_temp_/Counter/model/types/counterSchema.ts';
import {
    counterReducer
} from '@/components/entities/_temp_/Counter/model/slice/counterSlice.ts';


export type CounterReduxTestProviderProps = {
    children: React.ReactNode;
};

const CounterReduxTestProvider: React.FC<CounterReduxTestProviderProps> = (props) => {
    const { children } = props;
    const store        = configureStore<{ counter: CounterSchema }>({
        reducer: {
            counter: counterReducer,
        },
    });

    return (
        <Provider store={ store }>
            { children }
        </Provider>
    );
};

export default React.memo(CounterReduxTestProvider);