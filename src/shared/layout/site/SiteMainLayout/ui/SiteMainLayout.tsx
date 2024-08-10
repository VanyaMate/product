import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import classNames from 'classnames';
import css from './SiteMainLayout.module.scss';
import {
    IoClose,
    IoMenu,
    IoNotifications,
} from 'react-icons/io5';
import { inert } from '@/shared/lib/react/inert.ts';
import { keyboardClose } from '@/shared/lib/react/keyboardClose.ts';
import { noEvent } from '@/shared/lib/react/noEvent.ts';
import {
    SiteMainLayoutSideMenuProvider,
} from '@/shared/layout/site/SiteMainLayout/provider/SiteMainLayoutSideMenuProvider.tsx';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    LOCAL_STORAGE_SITE_MAIN_LAYOUT_RIGHT_MENU_OPENED,
} from '@/shared/layout/site/SiteMainLayout/const/site-main-layout.const.ts';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import { useTranslation } from 'react-i18next';


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
    const [ openedByHover, setOpenedByHover ]     = useState(false);
    const [ leftMenuOpened, setLeftMenuOpened ]   = useState(false);
    const [ rightMenuOpened, setRightMenuOpened ] = useState<boolean>(
        localStorage.getItem(LOCAL_STORAGE_SITE_MAIN_LAYOUT_RIGHT_MENU_OPENED) === 'true',
    );
    const mainLinkRef                             = useRef<HTMLAnchorElement>(null);
    const onCompleteAction                        = useCallback(() => {
        setLeftMenuOpened(false);
        setTimeout(() => mainLinkRef.current?.focus());
    }, []);
    const { t }                                   = useTranslation([ 'site-app' ]);

    const rightMenuToggle = function () {
        setRightMenuOpened((prev) => {
            localStorage.setItem(LOCAL_STORAGE_SITE_MAIN_LAYOUT_RIGHT_MENU_OPENED, (!prev).toString());
            return !prev;
        });
    };

    useEffect(() => {
        return keyboardClose(leftMenuOpened, setLeftMenuOpened);
    }, [ leftMenuOpened ]);

    const onMouseEnterLeftMenu = useCallback(() => {
        if (!leftMenuOpened) {
            setLeftMenuOpened(true);
            setOpenedByHover(true);
        }
    }, [ leftMenuOpened ]);

    const onMouseLeaveLeftMenu = useCallback(() => {
        if (leftMenuOpened && openedByHover) {
            setLeftMenuOpened(false);
            setOpenedByHover(false);
        }
    }, [ leftMenuOpened, openedByHover ]);

    return (
        <SiteMainLayoutSideMenuProvider
            onCompleteAction={ onCompleteAction }
            opened={ leftMenuOpened }
            setOpened={ setLeftMenuOpened }
        >
            <div { ...other }
                 className={ classNames(css.container, {}, [ className ]) }>
                <header className={ css.header }>
                    <PopOver
                        popover={ t(
                            leftMenuOpened
                            ? 'close_navigation_menu'
                            : 'open_navigation_menu',
                        ) }
                    >
                        <Button
                            aria-label={ t(
                                leftMenuOpened
                                ? 'close_navigation_menu'
                                : 'open_navigation_menu',
                            ) }
                            onClick={ () => setLeftMenuOpened((prev) => !prev) }
                            quad
                        >
                            { leftMenuOpened ? <IoClose/> : <IoMenu/> }
                        </Button>
                    </PopOver>
                    <div
                        className={ css.content }
                        { ...inert(leftMenuOpened) }
                    >
                        { header }
                    </div>
                    <PopOver
                        popover={ t(
                            rightMenuOpened
                            ? 'close_user_notifications'
                            : 'open_user_notifications',
                        ) }
                    >
                        <Button
                            aria-label={ t(
                                rightMenuOpened
                                ? 'close_user_notifications'
                                : 'open_user_notifications',
                            ) }
                            onClick={ rightMenuToggle }
                            quad
                            { ...inert(leftMenuOpened) }
                        >
                            { rightMenuOpened ? <IoClose/> :
                              <IoNotifications/> }
                        </Button>
                    </PopOver>
                </header>
                <div
                    className={ classNames(css.leftSideMenu, { [css.leftSideMenu_open]: leftMenuOpened }) }
                    onMouseEnter={ onMouseEnterLeftMenu }
                    onMouseLeave={ onMouseLeaveLeftMenu }
                >
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
                           ref={ mainLinkRef }
                           tabIndex={ -1 }
                        />
                        { children }
                    </div>
                </main>
                <div
                    className={ classNames(css.rightSideMenu, { [css.rightSideMenu_open]: rightMenuOpened && !leftMenuOpened }) }
                    { ...inert(leftMenuOpened || !rightMenuOpened) }
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