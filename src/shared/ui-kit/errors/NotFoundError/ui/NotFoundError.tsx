import { FC, memo } from 'react';
import css from './NotFoundError.module.scss';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type NotFoundErrorProps = {};

export const NotFoundError: FC<NotFoundErrorProps> = memo(function NotFoundError (props) {
    const {}    = props;
    const { t } = useTranslation();

    return (
        <div className={ css.container }>
            <h3>{ t.app.not_found_title }</h3>
            <p>{ t.app.not_found_description }</p>
        </div>
    );
});