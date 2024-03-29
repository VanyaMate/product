import React from 'react';


export type FooterNavBarProps = {};

const FooterNavBar: React.FC<FooterNavBarProps> = (props) => {
    const {} = props;

    return (
        <footer>
            FooterNavBarComponent
        </footer>
    );
};

export default React.memo(FooterNavBar);