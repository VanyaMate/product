import {
    createContext,
    Dispatch,
    SetStateAction,
} from 'react';


export type SiteMainLayoutSideMenuContextProps = {
    opened: boolean;
    setOpened: Dispatch<SetStateAction<boolean>>;
    onCompleteAction: () => void;
}

export const SiteMainLayoutSideMenuContext = createContext<SiteMainLayoutSideMenuContextProps>({
    opened          : false,
    setOpened       : () => {
    },
    onCompleteAction: () => {
    },
});