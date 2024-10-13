import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './HeaderSearch.module.scss';
import { useSearchParams } from 'react-router-dom';
import {
    useDropdownController,
} from '@/shared/ui-kit/modal/Dropdown/hooks/useDropdownController.ts';
import { Dropdown } from '@/shared/ui-kit/modal/Dropdown/ui/Dropdown.tsx';
import {
    SearchContainer,
} from '@/widgets/search/container/SearchContainer/SearchContainer.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';
import { useForm } from 'react-hook-form';
import { useDebounce } from '@/shared/hooks/useDebounce/useDebounce.ts';


export type HeaderSearchProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const HeaderSearch: FC<HeaderSearchProps> = memo(function HeaderSearch (props) {
    const { className, ...other }           = props;
    const [ searchParams, setSearchParams ] = useSearchParams();
    const debounce                          = useDebounce(300);
    const dropdown                          = useDropdownController();
    const setQuery                          = (query: string) => {
        if (query) {
            setSearchParams(new URLSearchParams({ query }));
            dropdown.setOpened(true);
        } else {
            setSearchParams({});
            dropdown.setOpened(false);
        }
    };
    const { handleSubmit, register }        = useForm<{ search: string }>(
        { mode: 'onChange' },
    );
    const { t }                             = useTranslation();

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            <Dropdown
                className={ css.item }
                containerClassName={ css.item }
                controller={ dropdown }
                dropdownContent={
                    <SearchContainer
                        className={ css.dropdownContent }
                        query={ searchParams.get('query') }
                    />
                }
            >
                <search role="search">
                    <form
                        className={ css.inputContainer }
                        onChange={ handleSubmit(({ search }) => debounce(() => setQuery(search))) }
                    >
                        <TextInput
                            className={ css.input }
                            placeholder={ t.search.search_placeholder }
                            type="text"
                            { ...register('search') }
                        />
                    </form>
                </search>
            </Dropdown>
        </div>
    );
});