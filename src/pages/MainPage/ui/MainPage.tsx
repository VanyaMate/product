import React from 'react';


const MainPageContent = React.lazy(() => import('./MainPage.async'));

export type MainPageProps = {};

const MainPage: React.FC<MainPageProps> = (props) => {
    const {} = props;

    return (
        <MainPageContent/>
    );
};

export default React.memo(MainPage);