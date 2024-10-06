import {
    ComponentPropsWithoutRef,
    FC,
    memo, useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import classNames from 'classnames';
import css from './TextInput.module.scss';
import { Tooltip } from '@/shared/ui-kit/modal/Tooltip/ui/Tooltip.tsx';


export type TextInputTypes =
    'text'
    | 'email'
    | 'password';

export type TextInputProps =
    {
        type?: TextInputTypes;
        label?: string;
        labelClassName?: string;
        errorMessage?: string;
    }
    & Omit<ComponentPropsWithoutRef<'input'>, 'type'>;

export const TextInput: FC<TextInputProps> = memo(function TextInput (props) {
    const {
              className,
              labelClassName,
              type = 'text',
              label,
              errorMessage,
              ...other
          } = props;

    const [ lastErrorMessage, setLastErrorMessage ] = useState<string>('');
    const containerRef                              = useRef<HTMLInputElement>();
    const uniqueInputId                             = useMemo(() => Math.random().toString(), []);

    useEffect(() => {
        if (errorMessage) {
            setLastErrorMessage(errorMessage);
        }
    }, [ errorMessage ]);

    if (label) {
        return (
            <label
                className={ classNames(css.labelContainer, {}, [ labelClassName ]) }
                htmlFor={ uniqueInputId }
            >
                <Tooltip
                    className={ css.errorMessage }
                    elementRef={ containerRef }
                    show={ !!errorMessage?.length }
                >
                    { lastErrorMessage }
                </Tooltip>
                <span>{ label }</span>
                <input
                    { ...other }
                    className={ classNames(css.container, {}, [ className ]) }
                    id={ uniqueInputId }
                    ref={ containerRef }
                    type={ type }
                />
            </label>
        );
    }

    return (
        <>
            <Tooltip
                className={ css.errorMessage }
                elementRef={ containerRef }
                show={ !!errorMessage?.length }
            >
                { lastErrorMessage }
            </Tooltip>
            <input
                className={ classNames(css.container, {}, [ className ]) }
                ref={ containerRef }
                type={ type }
                { ...other }
            />
        </>
    );
});