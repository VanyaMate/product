import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './MessagesNotFound.module.scss';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type MessagesNotFoundProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const MessagesNotFound: FC<MessagesNotFoundProps> = memo(function MessagesNotFound (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation();

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            { t.page.dialogues.search_messages_not_found }
        </div>
    );
});