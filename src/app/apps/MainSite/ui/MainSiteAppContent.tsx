import React from 'react';
import { MainSiteRouter } from '../routes';
import Navbar from '@/widgets/navbar/ui/Navbar/Navbar';


export type MainSiteAppContentProps = {};

const MainSiteAppContent: React.FC<MainSiteAppContentProps> = (props) => {
    const {} = props;

    return (
        <div style={ { minHeight: '100dvh' } }>
            <Navbar/>
            <MainSiteRouter/>
        </div>
    );
};

export default React.memo(MainSiteAppContent);