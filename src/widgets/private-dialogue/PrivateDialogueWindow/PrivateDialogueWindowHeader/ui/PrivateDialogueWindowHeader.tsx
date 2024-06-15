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


export type PrivateDialogueWindowHeaderProps =
    {
        dialogueId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateDialogueWindowHeader: FC<PrivateDialogueWindowHeaderProps> = memo(function PrivateDialogueWindowHeader (props) {
    const { className, dialogueId, ...other } = props;
    const search                              = useInputWithError({
        name    : '',
        debounce: 500,
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
        </div>
    );
});