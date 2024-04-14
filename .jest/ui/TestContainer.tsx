import React, { FC, memo } from 'react';


export type TestContainerProps = {
    children: React.ReactNode;
};

export const TestContainer: FC<TestContainerProps> = memo(function TestContainer (props) {
    const { children } = props;

    return (
        <div style={ { display: 'flex', flexDirection: 'column', gap: 20, padding: 20 } }>
            { children }
        </div>
    );
});