import { ComponentPropsWithoutRef, FC, memo, ReactNode } from 'react';
import css from './ScreenHeight.module.scss';
import classNames from 'classnames';


export type ScreenHeightProps =
    {
        footer?: ReactNode;
    }
    & ComponentPropsWithoutRef<'div'>;

export const ScreenHeight: FC<ScreenHeightProps> = memo(function ScreenHeight (props) {
    const { className, children, footer, ...other } = props;

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            {
                footer ?
                <>
                    <div>
                        { children }
                    </div>
                    {
                        footer
                    }
                </> : children
            }
        </div>
    );
});