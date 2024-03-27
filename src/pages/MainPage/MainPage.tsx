import React from 'react';


export type MainPageProps = {};

const MainPage: React.FC<MainPageProps> = (props) => {
    const {} = props;

    return (
        <div>
            MainPageComponent
        </div>
    );
};

export default React.memo(MainPage);