import React from 'react';


export type HomePageContentProps = {};

const HomePageContent: React.FC<HomePageContentProps> = (props) => {
    const {} = props;

    return (
        //eslint-disable-next-line i18next/no-literal-string
        <div>
            HomePageContentComponent
        </div>
    );
};

export default React.memo(HomePageContent);