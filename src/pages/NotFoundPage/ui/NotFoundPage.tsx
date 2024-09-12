import { FC, memo } from 'react';
import {
    NotFoundError,
} from '@/shared/ui-kit/errors/NotFoundError/ui/NotFoundError.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { useTitle } from '@/entities/site/hooks/useTitle/useTitle.ts';


export type NotFoundPageProps = {};

export const NotFoundPage: FC<NotFoundPageProps> = memo(function NotFoundPage (props) {
    const {}    = props;
    const { t } = useTranslation();

    useTitle(t.app.not_found_title);

    return (
        <NotFoundError/>
    );
});