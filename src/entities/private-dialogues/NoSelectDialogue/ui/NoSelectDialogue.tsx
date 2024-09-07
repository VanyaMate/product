import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NoSelectDialogue.module.scss';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type NoSelectDialogueProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const NoSelectDialogue: FC<NoSelectDialogueProps> = memo(function NoSelectDialogue (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation();

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            { t.page.dialogues.dialogue_not_selected }
        </div>
    );
});