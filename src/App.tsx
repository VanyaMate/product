import React from 'react';
import Counter from './components/Counter';
import './index.scss';


export type AppProps = {};

const App: React.FC<AppProps> = (props) => {
    const {} = props;

    return (
        <Counter/>
    );
};

export default React.memo(App);