import React, { useState } from 'react';
import css from './Counter.module.scss';


export type CounterProps = {};

const Counter: React.FC<CounterProps> = (props) => {
    const {}                  = props;
    const [ value, setValue ] = useState(0);
    const inc                 = function () {
        setValue((prev) => prev + 1);
    };
    const dec                 = function () {
        setValue((prev) => prev - 1);
    };

    return (
        <div className={ css.container }>
            <h1>{ value }</h1>
            <button onClick={ inc } className={ css.button }>inc</button>
            <button onClick={ dec } className={ css.button }>dec</button>
        </div>
    );
};

export default React.memo(Counter);