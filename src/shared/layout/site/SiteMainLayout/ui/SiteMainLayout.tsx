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
import { IoClose, IoMenu, IoPersonCircle } from 'react-icons/io5';
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
        leftSideMenu: ReactNode;
        rightSideMenu: ReactNode;
    }
    & ComponentPropsWithoutRef<'div'>;

export const SiteMainLayout: FC<SiteMainLayoutProps> = memo(function SiteMainLayout (props) {
    const {
              className,
              header,
              leftSideMenu,
              rightSideMenu,
              children,
              ...other
          }                                       = props;
    const [ leftMenuOpened, setLeftMenuOpened ]   = useState(false);
    const [ rightMenuOpened, setRightMenuOpened ] = useState<boolean>(true);
    const main                                    = useRef<HTMLAnchorElement>();
    const onCompleteAction                        = useCallback(() => {
        setLeftMenuOpened(false);
        setTimeout(() => main.current?.focus());
    }, []);

    useEffect(() => {
        return keyboardClose(leftMenuOpened, setLeftMenuOpened);
    }, [ leftMenuOpened ]);

    return (
        <SiteMainLayoutSideMenuProvider
            onCompleteAction={ onCompleteAction }
            opened={ leftMenuOpened }
            setOpened={ setLeftMenuOpened }
        >
            <div { ...other }
                 className={ classNames(css.container, {}, [ className ]) }>
                <header className={ css.header }>
                    <Button
                        onClick={ () => setLeftMenuOpened((prev) => !prev) }
                        quad
                    >
                        { leftMenuOpened ? <IoClose/> : <IoMenu/> }
                    </Button>
                    <div
                        className={ css.content }
                        { ...inert(leftMenuOpened) }
                    >
                        { header }
                    </div>
                    <Button
                        onClick={ () => setRightMenuOpened((prev) => !prev) }
                        quad
                        { ...inert(leftMenuOpened) }
                    >
                        { rightMenuOpened ? <IoClose/> : <IoPersonCircle/> }
                    </Button>
                </header>
                <div
                    className={ classNames(css.leftSideMenu, { [css.leftSideMenu_open]: leftMenuOpened }) }>
                    { leftSideMenu }
                </div>
                <main
                    className={ classNames(css.main, { [css.main_open]: leftMenuOpened }) }
                    { ...inert(leftMenuOpened) }
                >
                    <div className={ css.main_content }>
                        <a className={ css.main_content_link }
                           href="#"
                           onClick={ noEvent }
                           ref={ main }
                           tabIndex={ -1 }
                        />
                        { children }
                    </div>
                </main>
                <div
                    className={ classNames(css.rightSideMenu, { [css.rightSideMenu_open]: rightMenuOpened && !leftMenuOpened }) }
                    { ...inert(leftMenuOpened) }
                >
                    <div className={ css.content }>
                        { rightSideMenu }
                    </div>
                </div>
                <div
                    className={ classNames(css.closeOverlay, { [css.closeOverlay_hidden]: !leftMenuOpened }) }
                    onClick={ () => setLeftMenuOpened(false) }
                />
            </div>
        </SiteMainLayoutSideMenuProvider>
    );
});