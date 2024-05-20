import React from 'react';


export type AboutPageContentProps = {};

const AboutPage: React.FC<AboutPageContentProps> = (props) => {
    const {} = props;

    return (
        //eslint-disable-next-line i18next/no-literal-string
        <div>
            AboutPage
        </div>
    );
};

export default React.memo(AboutPage);