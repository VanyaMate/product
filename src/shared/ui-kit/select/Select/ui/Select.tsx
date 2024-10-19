import {
    ComponentPropsWithRef,
    FC, forwardRef,
    memo, MouseEventHandler, MutableRefObject,
    ReactNode,
    useCallback,
    useEffect, useLayoutEffect,
    useRef,
    useState,
} from 'react';
import classNames from 'classnames';
import css from './Select.module.scss';
import {
    Button,
    ButtonProps,
} from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    isChildElementOf,
} from '@/shared/lib/dom/isChildElementOf/isChildElementOf.ts';
import { IoChevronDown } from 'react-icons/io5';
import {
    getOptionLabel,
} from '@/shared/ui-kit/select/Select/lib/getOptionLabel.ts';
import {
    getCustomSelectChangeEvent,
} from '@/shared/ui-kit/select/Select/lib/getCustomSelectChangeEvent.ts';


/**
 * TODO:
 * Не стал реализовывать:
 * - Переключение без открытия
 * - Добавление aria- и role
 */


export type SelectOptionValueType =
    string;

export type SelectOption = {
    value: SelectOptionValueType;
    textLabel: string;
    customLabel?: ReactNode;
}

export type SelectProps =
    {
        options: Array<SelectOption>;
        initialValue?: SelectOptionValueType;
        buttonProps?: ButtonProps;
    }
    & ComponentPropsWithRef<'select'>;

export const Select: FC<SelectProps> = memo(forwardRef(function Select (props, ref: MutableRefObject<HTMLSelectElement>) {
    const {
              className,
              options,
              buttonProps,
              initialValue = '',
              ...other
          } = props;

    const [ currentLabel, setCurrentLabel ] = useState<string>(getOptionLabel(options, initialValue));
    const [ visible, setVisible ]           = useState<boolean>(false);
    const ulRef                             = useRef<HTMLUListElement>(null);
    const selectRef                         = useRef<HTMLSelectElement>(null);
    const selectedLiRef                     = useRef<HTMLLIElement>(null);
    const focusOnLiRef                      = useRef<HTMLLIElement>(null);
    const buttonRef                         = useRef<HTMLButtonElement>(null);
    const containerRef                      = useRef<HTMLDivElement>(null);

    const liSelectHandler = useCallback<MouseEventHandler<HTMLLIElement>>((e) => {
        const li: HTMLLIElement = e.target as HTMLLIElement;
        if (selectedLiRef.current !== null) {
            selectedLiRef.current.classList.remove(css.active);
        }

        const value             = li.getAttribute('data-value');
        selectRef.current.value = value;
        selectedLiRef.current   = li;
        focusOnLiRef.current    = li;
        setCurrentLabel(getOptionLabel(options, value));
        li.classList.add(css.active);
        setVisible(false);

        selectRef.current.dispatchEvent(getCustomSelectChangeEvent(value));
    }, [ options ]);

    useLayoutEffect(() => {
        if (containerRef.current) {
            selectRef.current = containerRef.current.querySelector('select');
        }
    }, []);

    useEffect(() => {
        if (visible && selectRef.current !== null && ulRef.current !== null) {
            if (initialValue !== '' && selectedLiRef.current === null) {
                const selectedLi: HTMLLIElement | null = ulRef.current.querySelector(`li[data-value="${ initialValue }"]`);
                if (selectedLi) {
                    selectedLiRef.current = selectedLi;
                    selectedLi.classList.add(css.active);
                }
            }

            const arrowDownKeyHandler = function () {
                if (focusOnLiRef.current === null) {
                    if (selectedLiRef.current !== null) {
                        const next = selectedLiRef.current.nextElementSibling as HTMLLIElement | null;
                        if (next) {
                            focusOnLiRef.current = next;
                            next.focus();
                        }
                    } else {
                        const firstLi: HTMLLIElement | null = ulRef.current.querySelector('li');
                        if (firstLi) {
                            focusOnLiRef.current = firstLi;
                            firstLi.focus();
                        } else {
                            setVisible(false);
                        }
                    }
                } else {
                    const next = focusOnLiRef.current.nextElementSibling as HTMLLIElement | null;
                    if (next) {
                        focusOnLiRef.current = next;
                        next.focus();
                    }
                }
            };

            const arrowUpKeyHandler = function () {
                if (focusOnLiRef.current === null) {
                    if (selectedLiRef.current !== null) {
                        const next = selectedLiRef.current.previousElementSibling as HTMLLIElement | null;
                        if (next) {
                            focusOnLiRef.current = next;
                            next.focus();
                        }
                    } else {
                        const firstLi: HTMLLIElement | null = ulRef.current.querySelector('li');
                        if (firstLi) {
                            focusOnLiRef.current = firstLi;
                            firstLi.focus();
                        } else {
                            setVisible(false);
                        }
                    }
                } else {
                    const next = focusOnLiRef.current.previousElementSibling as HTMLLIElement | null;
                    if (next) {
                        focusOnLiRef.current = next;
                        next.focus();
                    }
                }
            };

            const enterKeyHandler = function () {
                if (focusOnLiRef.current !== null) {
                    if (selectedLiRef.current !== null) {
                        selectedLiRef.current.classList.remove(css.active);
                    }

                    const value = focusOnLiRef.current.getAttribute('data-value');

                    selectedLiRef.current = focusOnLiRef.current;
                    selectedLiRef.current.classList.add(css.active);
                    selectRef.current.value = value;
                    setCurrentLabel(getOptionLabel(options, value));
                    setVisible(false);
                    buttonRef.current.focus();
                    selectRef.current.dispatchEvent(getCustomSelectChangeEvent(value));
                }
            };

            const tabKeyHandler = function () {
                setVisible(false);
                buttonRef.current.focus();
            };

            const escapeKeyHandler = function () {
                setVisible(false);
                buttonRef.current.focus();
            };

            const keydownHandler = function (e: KeyboardEvent) {
                switch (e.key) {
                    case 'ArrowDown':
                        e.preventDefault();
                        arrowDownKeyHandler();
                        break;
                    case 'ArrowUp':
                        e.preventDefault();
                        arrowUpKeyHandler();
                        break;
                    case 'Enter':
                        e.preventDefault();
                        enterKeyHandler();
                        break;
                    case 'Tab':
                        e.preventDefault();
                        tabKeyHandler();
                        break;
                    case 'Escape':
                        e.preventDefault();
                        escapeKeyHandler();
                        break;
                    default:
                        break;
                }
            };

            const onAnyMouseClick = function (e: Event) {
                const target: HTMLElement = e.target as unknown as HTMLElement;

                if (!isChildElementOf(containerRef.current, target)) {
                    setVisible(false);
                }
            };

            window.addEventListener('keydown', keydownHandler);
            window.addEventListener('click', onAnyMouseClick);
            return () => {
                window.removeEventListener('keydown', keydownHandler);
                window.removeEventListener('click', onAnyMouseClick);
            };
        }
    }, [ initialValue, options, visible ]);

    return (
        <div
            className={ classNames(css.container, { [css.visible]: visible }, [ className ]) }
            ref={ containerRef }
        >
            <select
                { ...other }
                defaultValue={ initialValue }
                multiple={ false }
                ref={ ref }
            >
                <option disabled value="">No select</option>
                {
                    options.map((option, index) => (
                        <option
                            key={ index }
                            value={ option.value }
                        >
                            { option.textLabel }
                        </option>
                    ))
                }
            </select>
            <Button
                { ...buttonProps }
                onClick={ (e) => {
                    e.preventDefault();
                    setVisible((prev) => !prev);
                } }
                ref={ buttonRef }
                type="button"
            >
                <span>{ currentLabel }</span>
                <IoChevronDown/>
            </Button>
            <ul ref={ ulRef }>
                {
                    options.map((option, index) => (
                        <li
                            data-value={ option.value }
                            key={ index }
                            onClick={ liSelectHandler }
                            tabIndex={ -1 }
                        >
                            { option.customLabel ?? option.textLabel }
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}));