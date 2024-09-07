import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NoMoreMessageDialogue.module.scss';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type NoMoreMessageDialogueProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const NoMoreMessageDialogue: FC<NoMoreMessageDialogueProps> = memo(function NoMoreMessageDialogue (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation();

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            { t.page.dialogues.no_more_messages_in_dialogue }
        </div>
    );
});