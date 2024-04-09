import { ComponentPropsWithoutRef, FC, memo, useMemo } from 'react';
import classNames from 'classnames';
import css from './Input.module.scss';
import { AiOutlineWarning } from 'react-icons/ai';
import { IUseInput } from '@/shared/ui-kit';


export type InputProps =
    {
        controller: IUseInput;
        label?: string;
    }
    & ComponentPropsWithoutRef<'input'>;

export const Input: FC<InputProps> = memo(function Input (props) {
    const { className, controller, label, required, ...other } = props;
    const generatedUniqueId: string                            = useMemo<string>(() => Math.random().toString(), []);

    return (
        <div className={ css.container }>
            { label || required
              ? <label
                  className={ classNames(css.label, { [css.error]: !controller.valid && !controller.empty }) }
                  htmlFor={ generatedUniqueId }
              >
                  { label }
                  { required ? <AiOutlineWarning/> : null }
              </label>
              : null }
            <input
                key="input"
                { ...other }
                className={ classNames(css.input, { [css.error]: !controller.valid && !controller.empty }, [ className ]) }
                defaultValue={ controller.getValue() }
                id={ generatedUniqueId }
                onChange={ controller.onChange }
                ref={ controller.inputRef }
                required={ required }
            />
        </div>
    );
});