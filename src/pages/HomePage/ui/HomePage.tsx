import React from 'react';
import {
    getAuthPending,
} from '@/app/redux/slices/auth/selectors/getAuthPending/getAuthPending.ts';
import { useAppSelector } from '@/app';
import { Button } from '@/shared/ui-kit';


export type HomePageContentProps = {};

const HomePage: React.FC<HomePageContentProps> = (props) => {
    const {}    = props;
    const state = useAppSelector(getAuthPending);

    return (
        //eslint-disable-next-line i18next/no-literal-string
        <div>
            HomePageComponent { state.toString() }
            { /* eslint-disable-next-line i18next/no-literal-string */ }
            <Button>Any button2</Button>
        </div>
    );
};

export default React.memo(HomePage);