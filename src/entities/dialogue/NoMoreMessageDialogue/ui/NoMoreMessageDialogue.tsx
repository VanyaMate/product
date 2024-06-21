import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NoMoreMessageDialogue.module.scss';
import { useTranslation } from 'react-i18next';


export type NoMoreMessageDialogueProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const NoMoreMessageDialogue: FC<NoMoreMessageDialogueProps> = memo(function NoMoreMessageDialogue (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation([ 'dialogue' ]);

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            { t('no_more_messages_in_dialogue') }
        </div>
    );
});