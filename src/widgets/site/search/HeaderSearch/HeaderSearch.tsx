import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './HeaderSearch.module.scss';
import { useSearchParams } from 'react-router-dom';
import {
    useInputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';
import {
    InputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/ui/InputWithError.tsx';
import {
    useDropdownController,
} from '@/shared/ui-kit/modal/Dropdown/hooks/useDropdownController.ts';
import { Dropdown } from '@/shared/ui-kit/modal/Dropdown/ui/Dropdown.tsx';
import {
    SearchContainer,
} from '@/widgets/search/container/SearchContainer/SearchContainer.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type HeaderSearchProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const HeaderSearch: FC<HeaderSearchProps> = memo(function HeaderSearch (props) {
    const { className, ...other }           = props;
    const [ searchParams, setSearchParams ] = useSearchParams();
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
    const search                            = useInputWithError({
        name           : '',
        onChangeHandler: setQuery,
        debounce       : 300,
    });
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
                    <InputWithError
                        className={ classNames(css.input, {}, [ css.item ]) }
                        containerClassName={ css.inputContainer }
                        controller={ search }
                        placeholder={ t.search.search_placeholder }
                    />
                </search>
            </Dropdown>
        </div>
    );
});