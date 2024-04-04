import React from 'react';
import Button from '@/components/shared/ui/buttons/Button/Button.tsx';
import { useDispatch, useSelector } from 'react-redux';
import {
    counterActions,
} from '@/components/entities/Counter/model/slice/counterSlice.ts';
import css from './Counter.module.scss';

import {
    getCounterValue,
} from '@/components/entities/Counter/model/selectors/getCounterValue/getCounterValue.ts';


export type CounterProps = {};

const Counter: React.FC<CounterProps> = (props) => {
    const {}           = props;
    const counterValue = useSelector(getCounterValue);
    const dispatch     = useDispatch();

    const increment = function () {
        dispatch(counterActions.increment());
    };

    const decrement = function () {
        dispatch(counterActions.decrement());
    };

    return (
        <div className={ css.container }>
            <h1>{ counterValue }</h1>
            <div className={ css.buttons }>
                <Button onClick={ increment }>+</Button>
                <Button onClick={ decrement }>-</Button>
            </div>
        </div>
    );
};

export default React.memo(Counter);