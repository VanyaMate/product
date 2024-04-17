import { ComponentPropsWithoutRef, FC, memo, ReactNode, useState } from 'react';
import classNames from 'classnames';
import css from './NavigationMenu.module.scss';
import { Button } from '@/shared/ui-kit';
import { IoClose, IoMenu } from 'react-icons/io5';
import { inert } from '@/shared/lib/react/inert.ts';


export type NavigationMenuProps =
    {
        header: ReactNode;
        sideMenu: ReactNode;
    }
    & ComponentPropsWithoutRef<'div'>;

export const NavigationMenu: FC<NavigationMenuProps> = memo(function NavigationMenu (props) {
    const { className, header, sideMenu, children, ...other } = props;
    const [ open, setOpen ]                                   = useState(false);

    return (
        <div { ...other } className={ classNames(css.container, {}, [ className ]) }>
            <header className={ css.header }>
                <Button
                    onClick={ () => setOpen((prev) => !prev) }
                    quad
                >
                    {
                        open ? <IoClose/> : <IoMenu/>
                    }
                </Button>
                <div
                    className={ css.content }
                    { ...inert(open) }
                >
                    { header }
                </div>
            </header>
            <nav className={ classNames(css.sideMenu, { [css.sideMenu_open]: open }) }>
                { sideMenu }
            </nav>
            <main
                className={ classNames(css.main, { [css.main_open]: open }) }
                { ...inert(open) }
            >
                { children }
            </main>
            <div
                className={ classNames(css.closeOverlay, { [css.closeOverlay_hidden]: !open }) }
                onClick={ () => setOpen(false) }
            />
        </div>
    );
});