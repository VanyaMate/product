import React from 'react';


export type AboutPageProps = {};

const AboutPage: React.FC<AboutPageProps> = (props) => {
    const {} = props;

    return (
        <div>
            AboutPageComponent
        </div>
    );
};

export default React.memo(AboutPage);