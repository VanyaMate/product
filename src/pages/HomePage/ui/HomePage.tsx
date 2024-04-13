import React from 'react';
import { useSelector } from 'react-redux';
import { getAuthPending } from '@/app/redux/slices/auth/selectors/getAuthPending.ts';


export type HomePageContentProps = {};

const HomePage: React.FC<HomePageContentProps> = (props) => {
    const {}    = props;
    const state = useSelector(getAuthPending);

    return (
        //eslint-disable-next-line i18next/no-literal-string
        <div>
            HomePageComponent { state.toString() }
        </div>
    );
};

export default React.memo(HomePage);