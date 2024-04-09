import { FC, memo } from 'react';


export type FooterNavBarProps = {};

export const FooterNavBar: FC<FooterNavBarProps> = memo(function FooterNavBar (props) {
    const {} = props;

    return (
        //eslint-disable-next-line i18next/no-literal-string
        <footer>
            FooterNavBarComponent
        </footer>
    );
});