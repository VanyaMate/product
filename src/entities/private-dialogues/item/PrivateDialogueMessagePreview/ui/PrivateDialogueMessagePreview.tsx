import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './PrivateDialogueMessagePreview.module.scss';
import { DomainMessage } from 'product-types/dist/message/DomainMessage';


export type PrivateDialogueMessagePreviewProps =
    {
        message: DomainMessage;
        login: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateDialogueMessagePreview: FC<PrivateDialogueMessagePreviewProps> = memo(function PrivateDialogueMessagePreview (props) {
    const { className, message, login, ...other } = props;

    if (!message) {
        return (
            <div
                { ...other }
                className={ classNames(css.container, {}, [ className ]) }
            >
                {/* eslint-disable-next-line i18next/no-literal-string */}
                <span className={ css.empty }>Empty dialogue</span>
            </div>
        );
    }

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <span className={ css.sender }>
                {
                    message.author.login === login
                    ? 'me:'
                    : `${ message.author.login[0] }:`
                }
            </span>
            <span className={ css.text }>
                {
                    message.message
                }
            </span>
        </div>
    );
});