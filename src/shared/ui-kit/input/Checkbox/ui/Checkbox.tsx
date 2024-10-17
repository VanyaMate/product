import {
    ComponentPropsWithoutRef,
    FC,
    ForwardedRef,
    forwardRef,
    memo,
    useCallback,
    useRef,
    useState,
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
    const [ checked, setChecked ]        = useState<boolean>(!!props.checked);
    const labelRef                       = useRef<HTMLLabelElement>(null);

    /*
     *  Это сделано так потому что я использую react-hook-form который не
     *  вызывает change эвенты при изменении полей через функции и в итоге я
     *  отслеживаю изменения через css и transitionEnd
     *
     *  Можно будет в будущем переделать верстку и убрать checked впринципе
     */
    const onTransitionStart = useCallback(() => {
        const ref = labelRef.current;
        if (ref) {
            setChecked(ref.querySelector('input').checked);
        }
    }, []);

    return (
        <label
            className={ classNames(css.container, { [css.checked]: checked }, [ className ]) }
            ref={ labelRef }
        >
            <input
                ref={ ref }
                type="checkbox"
                { ...other }
            />
            <span>
                { label }
            </span>
            <div onTransitionEnd={ onTransitionStart }/>
        </label>
    );
}));