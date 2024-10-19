import {
    ComponentPropsWithoutRef,
    FC,
    ForwardedRef,
    forwardRef,
    memo,
    useMemo,
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
    const uniqueId                       = useMemo(() => crypto.randomUUID(), []);

    return (
        <div
            className={ classNames(css.container, {}, [ className ]) }
        >
            <input
                id={ uniqueId }
                ref={ ref }
                type="checkbox"
                { ...other }
            />
            <label htmlFor={ uniqueId }>
                { label }
            </label>
        </div>
    );
}));