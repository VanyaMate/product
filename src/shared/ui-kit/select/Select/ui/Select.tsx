import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import classNames from 'classnames';
import css from './Select.module.scss';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';


export type SelectOptionValueType =
    string;

export type SelectOption = {
    value: SelectOptionValueType;
    label: ReactNode;
}

export type SelectProps =
    {
        options: Array<SelectOption>;
        initialValue?: SelectOptionValueType;
    }
    & ComponentPropsWithoutRef<'div'>;

export const Select: FC<SelectProps> = memo(function Select (props) {
    const {
              className,
              options,
              initialValue = '',
              ...other
          } = props;

    const [ visible, setVisible ] = useState<boolean>(false);
    // const [ currentValue, setCurrentValue ] =
    // useState<SelectOptionValueType>(initialValue);
    const ulRef         = useRef<HTMLUListElement>(null);
    const selectRef     = useRef<HTMLSelectElement>(null);
    const selectedLiRef = useRef<HTMLLIElement>(null);
    const focusOnLiRef  = useRef<HTMLLIElement>(null);
    const buttonRef     = useRef<HTMLButtonElement>(null);

    const liSelectHandler = useCallback((li: HTMLLIElement) => {
        if (li) {
            li.addEventListener('click', () => console.log('click'));
        }
    }, []);

    useEffect(() => {
        // Если нужно показать и есть select
        if (visible && selectRef.current !== null) {
            const selectValue = selectRef.current.value;

            // Если значение select не пустое
            if (selectValue !== '') {

                // Если есть уже выбранный li с нужным data-value
                if (selectedLiRef.current !== null && selectedLiRef.current.getAttribute('data-value') === selectValue) {
                    selectedLiRef.current.focus();
                    focusOnLiRef.current.focus();

                    // Если ulRef существует
                } else if (ulRef.current !== null) {

                    // Найти первый li с нужным data-value
                    const li: HTMLLIElement | null = ulRef.current.querySelector(`li[data-value="${ selectValue }"]`);
                    if (li) {
                        focusOnLiRef.current = li;
                        li.focus();
                    } else {

                        // Очистить и найти первый li
                        selectRef.current.value             = '';
                        const firstLi: HTMLLIElement | null = ulRef.current.querySelector('li');
                        if (firstLi) {
                            focusOnLiRef.current = firstLi;
                            firstLi.focus();
                        } else {

                            // Иначе скрыть
                            setVisible(false);
                        }
                    }
                }
            } else {
                console.log('here 1');
                // Найти первый li
                const firstLi: HTMLLIElement | null = ulRef.current.querySelector('li');
                if (firstLi) {
                    console.log(firstLi);
                    focusOnLiRef.current = firstLi;
                } else {
                    // Иначе скрыть
                    setVisible(false);
                }
            }

            const arrowDownKeyHandler = function () {
                if (focusOnLiRef.current !== null) {
                    const next = focusOnLiRef.current.nextElementSibling as HTMLLIElement | null;
                    if (next) {
                        focusOnLiRef.current = next;
                        next.focus();
                    }
                }
            };

            const arrowUpKeyHandler = function () {
                if (focusOnLiRef.current !== null) {
                    const next = focusOnLiRef.current.previousElementSibling as HTMLLIElement | null;
                    console.log('next is', next);
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

                    selectedLiRef.current = focusOnLiRef.current;
                    selectedLiRef.current.classList.add(css.active);
                    selectRef.current.value = selectedLiRef.current.getAttribute('data-value');
                    setVisible(false);
                    buttonRef.current.focus();
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

            window.addEventListener('keydown', keydownHandler);
            return () => {
                window.removeEventListener('keydown', keydownHandler);
            };
        }
    }, [ visible ]);

    return (
        <div
            { ...other }
            className={ classNames(css.container, { [css.visible]: visible }, [ className ]) }
        >
            <select
                defaultValue={ initialValue }
                multiple={ false }
                ref={ selectRef }
            >
                <option disabled value="">No select</option>
                {
                    options.map((option, index) => (
                        <option
                            key={ index }
                            value={ option.value }
                        >
                            { option.label }
                        </option>
                    ))
                }
            </select>
            <Button
                onClick={ (e) => {
                    e.preventDefault();
                    setVisible((prev) => !prev);
                } }
                ref={ buttonRef }
            >
                Open
            </Button>
            <ul ref={ ulRef }>
                {
                    options.map((option, index) => (
                        <li
                            data-value={ option.value }
                            key={ index }
                            ref={ liSelectHandler }
                            tabIndex={ -1 }
                        >
                            { option.label }
                        </li>
                    ))
                }
            </ul>
        </div>
    );
});