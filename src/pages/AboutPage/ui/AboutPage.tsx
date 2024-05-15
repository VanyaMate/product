import React from 'react';
import {
    TestingNotificationList,
} from '@/features/notification/ui/TestingNotificationList/ui/TestingNotificationList.tsx';


export type AboutPageContentProps = {};

const AboutPage: React.FC<AboutPageContentProps> = (props) => {
    const {} = props;

    return (
        //eslint-disable-next-line i18next/no-literal-string
        <div>
            AboutPage
            <TestingNotificationList/>
        </div>
    );
};

export default React.memo(AboutPage);