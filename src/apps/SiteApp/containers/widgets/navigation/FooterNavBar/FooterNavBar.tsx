import React from 'react';


export type FooterNavBarProps = {};

const FooterNavBar: React.FC<FooterNavBarProps> = (props) => {
    const {} = props;

    return (
        //eslint-disable-next-line i18next/no-literal-string
        <footer>
            FooterNavBarComponent
        </footer>
    );
};

export default React.memo(FooterNavBar);