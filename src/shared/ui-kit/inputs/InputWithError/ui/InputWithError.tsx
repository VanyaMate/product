import { ComponentPropsWithoutRef, FC, memo, useMemo } from 'react';
import classNames from 'classnames';
import css from './InputWithError.module.scss';
import {
    IUseInputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';


export type InputWithErrorProps =
    {
        label?: string;
        controller: IUseInputWithError
        containerClassName?: string;
    }
    & ComponentPropsWithoutRef<'input'>;

export const InputWithError: FC<InputWithErrorProps> = memo(function InputWithError (props) {
    const {
              label,
              className,
              controller,
              containerClassName,
              ...other
          } = props;
    const generateUniqueId: string = useMemo<string>(() => Math.random().toString(), []);

    return (
        <div
            className={ classNames(css.container, { [css.noValid]: !controller.isValid }, [ containerClassName ]) }>
            {
                label
                ? <label
                    className={ css.label }
                    htmlFor={ generateUniqueId }>{ label }</label>
                : null
            }
            <input
                key="input"
                { ...other }
                className={ classNames(css.input, {}, [ className ]) }
                id={ generateUniqueId }
                onChange={ controller.onChangeHandler }
                ref={ controller.inputRef }
            />
            <div className={ css.error } key="error-showcase">
                { controller.errorMessage }
            </div>
        </div>
    );
});