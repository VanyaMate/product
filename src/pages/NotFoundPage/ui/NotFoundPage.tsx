import { FC, memo } from 'react';
import { NotFoundError } from '@/shared/ui-kit';


export type NotFoundPageProps = {};

export const NotFoundPage: FC<NotFoundPageProps> = memo(function NotFoundPage (props) {
    const {} = props;

    return (
        <NotFoundError/>
    );
});