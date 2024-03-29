import React from 'react';
import { useTranslation } from 'react-i18next';


export type HomePageProps = {};

const HomePage: React.FC<HomePageProps> = (props) => {
    const {}    = props;
    const { t } = useTranslation('pages/home-page');

    return (
        <div>
            { t('text') }
        </div>
    );
};

export default React.memo(HomePage);