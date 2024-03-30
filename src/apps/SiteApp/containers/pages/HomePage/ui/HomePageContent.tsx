import React from 'react';


export type HomePageContentProps = {};

const HomePageContent: React.FC<HomePageContentProps> = (props) => {
    const {} = props;

    return (
        <div>
            HomePageContentComponent
        </div>
    );
};

export default React.memo(HomePageContent);