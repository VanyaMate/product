import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './MessagesNotFound.module.scss';
import { useTranslation } from 'react-i18next';


export type MessagesNotFoundProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const MessagesNotFound: FC<MessagesNotFoundProps> = memo(function MessagesNotFound (props) {
    const { className, ...other } = props;
    const { t }                   = useTranslation([ 'dialogue' ]);

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            { t('search_messages_not_found') }
        </div>
    );
});