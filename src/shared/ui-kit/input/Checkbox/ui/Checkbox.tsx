import {
    ChangeEvent,
    ChangeEventHandler,
    ComponentPropsWithoutRef,
    FC,
    ForwardedRef,
    forwardRef,
    memo, useCallback, useState,
} from 'react';
import classNames from 'classnames';
import css from './Checkbox.module.scss';


export type CheckboxProps =
    {
        label: string;
    }
    & Omit<ComponentPropsWithoutRef<'input'>, 'type'>;

export const Checkbox: FC<CheckboxProps> = memo(forwardRef(function Checkbox (props, ref: ForwardedRef<HTMLInputElement>) {
    const { className, label, onChange, ...other } = props;
    const [ checked, setChecked ]                  = useState<boolean>(!!props.checked);

    const onChangeHandler = useCallback<ChangeEventHandler>((e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if (target) {
            setChecked(target.checked);
        }

        if (onChange) {
            onChange(e);
        }
    }, [ onChange ]);

    return (
        <label
            className={ classNames(css.container, { [css.checked]: checked }, [ className ]) }>
            <input
                onChange={ onChangeHandler }
                ref={ ref }
                type="checkbox"
                { ...other }
            />
            <span>{ label }</span>
            <div/>
        </label>
    );
}));