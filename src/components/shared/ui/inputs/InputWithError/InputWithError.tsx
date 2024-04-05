import React, { useMemo } from 'react';
import classNames from 'classnames';
import css from './InputWithError.module.scss';


export type InputWithErrorProps =
    {
        label?: string;
    }
    & React.ComponentPropsWithoutRef<'input'>;

const InputWithError: React.FC<InputWithErrorProps> = (props) => {
    const { label, className, ...other } = props;
    const generateUniqueId: string       = useMemo<string>(() => Math.random().toString(), []);

    return (
        <div className={ css.container }>
            <div className={ css.error } key="error-showcase">Длина должна быть больше 5 и
                меньше 16
            </div>
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
            />
        </div>
    );
};

export default React.memo(InputWithError);