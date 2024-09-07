import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './PrivateDialogueMessagePreview.module.scss';
import { DomainMessage } from 'product-types/dist/message/DomainMessage';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type PrivateDialogueMessagePreviewProps =
    {
        message: DomainMessage;
        login: string;
        selected: boolean;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateDialogueMessagePreview: FC<PrivateDialogueMessagePreviewProps> = memo(function PrivateDialogueMessagePreview (props) {
    const { className, message, login, selected, ...other } = props;
    const { t }                                             = useTranslation();

    if (!message) {
        return (
            <div
                { ...other }
                className={ classNames(css.container, { [css.selected]: selected }, [ className ]) }
            >
                <span
                    className={ css.empty }>{ t.page.dialogues.empty_dialogue }</span>
            </div>
        );
    }

    return (
        <div
            { ...other }
            className={ classNames(css.container, { [css.selected]: selected }, [ className ]) }
        >
            <span className={ css.sender }>
                {
                    message.author.login === login
                    ? `${ t.page.dialogues.dialogue_me }:`
                    : `${ message.author.login[0] }:`
                }
            </span>
            <span className={ css.text }>{ message.message }</span>
        </div>
    );
});