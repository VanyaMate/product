import React from 'react';


export type TestContainerProps = {
    children: React.ReactNode;
};

const TestContainer: React.FC<TestContainerProps> = (props) => {
    const { children } = props;

    return (
        <div style={ { display: 'flex', flexDirection: 'column', gap: 20, padding: 20 } }>
            { children }
        </div>
    );
};

export default React.memo(TestContainer);