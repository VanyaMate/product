import React from 'react';


const AboutPageContent = React.lazy(() => import('./AboutPage.async'));

export type AboutPageProps = {};

const AboutPage: React.FC<AboutPageProps> = (props) => {
    const {} = props;

    return (
        <AboutPageContent/>
    );
};

export default React.memo(AboutPage);