import { ComponentPropsWithoutRef, FC, memo, useEffect } from 'react';
import classNames from 'classnames';
import css from './PrivateDialogueWindowHeader.module.scss';
import { IoAdd } from 'react-icons/io5';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    InputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/ui/InputWithError.tsx';
import {
    useInputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';
import { useAppDispatch } from '@/app/redux/hooks/useAppDispatch.ts';
import {
    searchPrivateMessages,
} from '@/app/redux/slices/private-messages/thunks/searchPrivateMessages.ts';
import {
    removePrivateMessageSearch,
} from '@/app/redux/slices/private-messages/thunks/removePrivateMessageSearch.ts';


export type PrivateDialogueWindowHeaderProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateDialogueWindowHeader: FC<PrivateDialogueWindowHeaderProps> = memo(function PrivateDialogueWindowHeader (props) {
    const { className, dialogueId, children, ...other } = props;
    const dispatch                                      = useAppDispatch();
    const search                                        = useInputWithError({
        name           : '',
        debounce       : 500,
        onChangeHandler: (query) => {
            query
            ? dispatch(
                searchPrivateMessages([ dialogueId, {
                    query,
                    limit : 20,
                    offset: 0,
                } ]),
            )
            : dispatch(removePrivateMessageSearch(dialogueId));
        },
    });

    useEffect(() => {
        // TODO: Temp
        search.inputRef.current.value = '';
        search.value.current          = '';
    }, [ dialogueId, search.inputRef, search.value ]);

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <Row>
                <InputWithError controller={ search }/>
                <Button quad><IoAdd/></Button>
                <Button quad><IoAdd/></Button>
                <Button quad><IoAdd/></Button>
                <Button quad><IoAdd/></Button>
            </Row>
            { children }
        </div>
    );
});