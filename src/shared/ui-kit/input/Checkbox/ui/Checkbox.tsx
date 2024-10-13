import {
    ComponentPropsWithoutRef,
    FC,
    ForwardedRef,
    forwardRef,
    memo,
} from 'react';
import classNames from 'classnames';
import css from './Checkbox.module.scss';


export type CheckboxProps =
    {
        label: string;
    }
    & Omit<ComponentPropsWithoutRef<'input'>, 'type'>;

export const Checkbox: FC<CheckboxProps> = memo(forwardRef(function Checkbox (props, ref: ForwardedRef<HTMLInputElement>) {
    const { className, label, ...other } = props;

    return (
        <label className={ classNames(css.container, {}, [ className ]) }>
            <input
                defaultChecked={ true }
                ref={ ref }
                type="checkbox"
                { ...other }
            />
            <span>{ label }</span>
        </label>
    );
}));