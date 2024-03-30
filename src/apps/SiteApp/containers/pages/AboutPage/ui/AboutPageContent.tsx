import React from 'react';


export type AboutPageContentProps = {};

const AboutPageContent: React.FC<AboutPageContentProps> = (props) => {
    const {} = props;

    return (
        <div>
            AboutPageContentComponent
        </div>
    );
};

export default React.memo(AboutPageContent);