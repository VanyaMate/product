import {
    Dispatch,
    FC,
    memo,
    ReactNode,
    SetStateAction,
    useMemo,
} from 'react';
import {
    SiteMainLayoutSideMenuContext, SiteMainLayoutSideMenuContextProps,
} from '../context/SiteMainLayoutSideMenuContext.ts';


export type SiteMainLayoutSideMenuProviderProps =
    {
        opened: boolean;
        setOpened: Dispatch<SetStateAction<boolean>>;
        onCompleteAction: () => void;
        children: ReactNode;
    };

export const SiteMainLayoutSideMenuProvider: FC<SiteMainLayoutSideMenuProviderProps> = memo(function SiteMainLayoutSideMenuProvider (props) {
    const { children, opened, setOpened, onCompleteAction } = props;
    const contextValue                                      = useMemo<SiteMainLayoutSideMenuContextProps>(() => ({
        opened, setOpened, onCompleteAction,
    }), [ onCompleteAction, opened, setOpened ]);

    return (
        <SiteMainLayoutSideMenuContext.Provider value={ contextValue }>
            { children }
        </SiteMainLayoutSideMenuContext.Provider>
    );
});