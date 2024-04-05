import React, { useMemo } from 'react';
import classNames from 'classnames';
import css from './Input.module.scss';
import { IUseInput } from '@/components/shared/ui/inputs/Input/hooks/useInput.ts';
import { AiOutlineWarning } from 'react-icons/ai';


export type InputProps =
    {
        controller: IUseInput;
        label?: string;
    }
    & React.ComponentPropsWithoutRef<'input'>;

const Input: React.FC<InputProps> = (props) => {
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
};

export default React.memo(Input);