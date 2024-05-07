import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    ReactNode,
    useCallback, useEffect, useRef,
    useState,
} from 'react';
import classNames from 'classnames';
import css from './SiteMainLayout.module.scss';
import { IoClose, IoMenu } from 'react-icons/io5';
import { inert } from '@/shared/lib/react/inert.ts';
import { keyboardClose } from '@/shared/lib/react/keyboardClose.ts';
import { noEvent } from '@/shared/lib/react/noEvent.ts';
import {
    SiteMainLayoutSideMenuProvider,
} from '@/shared/layout/site/SiteMainLayout/provider/SiteMainLayoutSideMenuProvider.tsx';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';


export type SiteMainLayoutProps =
    {
        header: ReactNode;
        sideMenu: ReactNode;
    }
    & ComponentPropsWithoutRef<'div'>;

export const SiteMainLayout: FC<SiteMainLayoutProps> = memo(function SiteMainLayout (props) {
    const { className, header, sideMenu, children, ...other } = props;
    const [ open, setOpen ]                                   = useState(false);
    const main                                                = useRef<HTMLAnchorElement>();
    const onCompleteAction                                    = useCallback(() => {
        setOpen(false);
        setTimeout(() => main.current?.focus());
    }, []);

    useEffect(() => {
        return keyboardClose(open, setOpen);
    }, [ open ]);

    return (
        <SiteMainLayoutSideMenuProvider
            onCompleteAction={ onCompleteAction }
            opened={ open }
            setOpened={ setOpen }
        >
            <div { ...other }
                 className={ classNames(css.container, {}, [ className ]) }>
                <header className={ css.header }>
                    <Button
                        onClick={ () => setOpen((prev) => !prev) }
                        quad
                    >
                        { open ? <IoClose/> : <IoMenu/> }
                    </Button>
                    <div
                        className={ css.content }
                        { ...inert(open) }
                    >
                        { header }
                    </div>
                </header>
                <div
                    className={ classNames(css.sideMenu, { [css.sideMenu_open]: open }) }>
                    { sideMenu }
                </div>
                <main
                    className={ classNames(css.main, { [css.main_open]: open }) }
                    { ...inert(open) }
                >
                    <a href="#" onClick={ noEvent } ref={ main }
                       tabIndex={ -1 }/>
                    { children }
                </main>
                <div
                    className={ classNames(css.closeOverlay, { [css.closeOverlay_hidden]: !open }) }
                    onClick={ () => setOpen(false) }
                />
            </div>
        </SiteMainLayoutSideMenuProvider>
    );
});