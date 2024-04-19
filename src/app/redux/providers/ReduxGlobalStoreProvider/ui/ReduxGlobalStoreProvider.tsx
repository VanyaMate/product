import { FC, memo, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createGlobalStore } from '@/app/redux/config';


export type ReduxGlobalStoreProviderProps = {
    children: ReactNode;
};

export const ReduxGlobalStoreProvider: FC<ReduxGlobalStoreProviderProps> = memo(function ReduxGlobalStoreProvider (props) {
    const { children } = props;
    const store        = createGlobalStore();

    return (
        <Provider store={ store }>
            { children }
        </Provider>
    );
});