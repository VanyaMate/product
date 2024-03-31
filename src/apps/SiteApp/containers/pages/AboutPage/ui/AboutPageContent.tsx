import React from 'react';


export type AboutPageContentProps = {};

const AboutPageContent: React.FC<AboutPageContentProps> = (props) => {
    const {} = props;

    return (
        //eslint-disable-next-line i18next/no-literal-string
        <div>
            AboutPageContentComponent
        </div>
    );
};

export default React.memo(AboutPageContent);