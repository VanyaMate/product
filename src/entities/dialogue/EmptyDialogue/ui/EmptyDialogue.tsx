import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './EmptyDialogue.module.scss';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type EmptyDialogueProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const EmptyDialogue: FC<EmptyDialogueProps> = memo(function EmptyDialogue (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation();

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            { t.page.dialogues.empty_dialogue }
        </div>
    );
});