import React, { useState } from 'react';
import './Counter.scss';


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
        <div>
            <h1>{ value }</h1>
            <button onClick={ inc }>inc</button>
            <button onClick={ dec }>dec</button>
        </div>
    );
};

export default React.memo(Counter);