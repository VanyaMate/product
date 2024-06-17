import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './NoSelectDialogue.module.scss';
import { useTranslation } from 'react-i18next';


export type NoSelectDialogueProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const NoSelectDialogue: FC<NoSelectDialogueProps> = memo(function NoSelectDialogue (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation([ 'dialogue' ]);

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            { t('dialogue_not_selected') }
        </div>
    );
});