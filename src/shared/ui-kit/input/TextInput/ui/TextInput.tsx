import {
    ComponentPropsWithRef,
    FC,
    forwardRef,
    memo,
    useLayoutEffect,
    useState,
} from 'react';
import classNames from 'classnames';
import css from './TextInput.module.scss';


export type TextInputType =
    'text'
    | 'email'
    | 'number'
    | 'password';

export type TextInputTooltipPosition =
    'top'
    | 'bottom';

export type TextInputProps =
    {
        type: TextInputType;
        errorMessage?: string;
        label?: string;
        labelClassName?: string;
        tooltipPosition?: TextInputTooltipPosition;
    }
    & Omit<ComponentPropsWithRef<'input'>, 'type'>;

export const TextInput: FC<TextInputProps> = memo(forwardRef(function TextInput (props, ref) {
    const {
              className,
              label,
              labelClassName,
              errorMessage    = '',
              tooltipPosition = 'top',
              ...other
          } = props;

    const [ messageError, setMessageError ] = useState<string>(errorMessage);
    const showError                         = !!errorMessage.length;

    /**
     * Сохренение последней ошибки, чтобы не было фликера
     */
    useLayoutEffect(() => {
        if (errorMessage) {
            setMessageError(errorMessage);
        }
    }, [ errorMessage ]);

    const Input = (
        <div className={ css.container }>
            <input
                className={ classNames(css.input, { [css.inputError]: showError }, [ className ]) }
                ref={ ref }
                { ...other }
            />
            <div className={ css.errorTooltip }/>
            <div
                className={ classNames(
                    css.errorMessage,
                    {
                        [css.errorMessageTop]: tooltipPosition === 'top',
                    },
                ) }>
                { messageError }
            </div>
        </div>
    );

    if (label) {
        return (
            <label
                className={ classNames(css.labelContainer, {}, [ labelClassName ]) }
            >
                <span className={ css.label }>{ label }</span>
                { Input }
            </label>
        );
    }

    return Input;
}));