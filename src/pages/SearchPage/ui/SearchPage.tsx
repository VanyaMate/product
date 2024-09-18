import { ComponentPropsWithoutRef, FC, memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    InputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/ui/InputWithError.tsx';
import {
    useInputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    SearchContainer,
} from '@/widgets/search/container/SearchContainer/SearchContainer.tsx';
import css from './SearchPage.module.scss';
import classNames from 'classnames';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type SearchPageProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const SearchPage: FC<SearchPageProps> = memo(function SearchPage (props) {
    const { className, ...other }           = props;
    const [ searchParams, setSearchParams ] = useSearchParams();
    const setQuery                          = (query: string) =>
        setSearchParams(query ? new URLSearchParams({ query }) : {});
    const search                            = useInputWithError({
        name           : '',
        onChangeHandler: setQuery,
        debounce       : 300,
    });
    const { t }                             = useTranslation();

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <Row fullWidth>
                <InputWithError
                    className={ classNames(css.input, {}, [ css.item ]) }
                    containerClassName={ css.inputContainer }
                    controller={ search }
                    placeholder={ t.search.search_placeholder }
                />
            </Row>
            <Col className={ css.item }>
                <SearchContainer query={ searchParams.get('query') }/>
            </Col>
        </div>
    );
});