import { ComponentPropsWithoutRef, FC, memo } from 'react';
import {
    UsersSearchList,
} from '@/widgets/user/list/UsersSearchList/ui/UsersSearchList.tsx';
import { useSearchParams } from 'react-router-dom';
import {
    InputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/ui/InputWithError.tsx';
import {
    useInputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';


export type SearchPageProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const SearchPage: FC<SearchPageProps> = memo(function SearchPage (props) {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const setQuery                          = (query: string) => setSearchParams(new URLSearchParams({ query }));
    const search                            = useInputWithError({
        name           : '',
        onChangeHandler: setQuery,
        debounce       : 300,
    });

    // TODO
    return (
        <Col { ...props }>
            <Row>
                <InputWithError
                    controller={ search }
                    defaultValue={ searchParams.get('query') }
                />
                <Button
                    onClick={ () => setQuery(search.value.current) }>//</Button>
            </Row>
            <UsersSearchList
                limit={ 10 }
                offset={ 0 }
                query={ searchParams.get('query') }
            />
        </Col>
    );
});