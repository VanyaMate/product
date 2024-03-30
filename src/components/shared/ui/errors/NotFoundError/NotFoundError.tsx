import React from 'react';
import css from './NotFoundError.module.scss';
import { useTranslation } from 'react-i18next';


export type NotFoundErrorProps = {};

const NotFoundError: React.FC<NotFoundErrorProps> = (props) => {
    const {}    = props;
    const { t } = useTranslation();

    return (
        <div className={ css.container }>
            <h3>{ t('not_found_title') }</h3>
            <p>{ t('not_found_description') }</p>
        </div>
    );
};

export default React.memo(NotFoundError);