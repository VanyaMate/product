import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './Divider.module.scss';


export enum DividerType {
    VERTICAL,
    HORIZONTAL
}

export type DividerProps =
    {
        type: DividerType
    }
    & ComponentPropsWithoutRef<'div'>;

export const Divider: FC<DividerProps> = memo(function Divider (props) {
    const {
              type = DividerType.VERTICAL,
              className,
              ...other
          } = props;

    return (
        <div { ...other }
             className={ classNames(css.container, { [css.horizontal]: type === DividerType.HORIZONTAL }, [ className ]) }/>
    );
});