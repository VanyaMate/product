import React from 'react';
import NotFoundError from '@/components/shared/ui/errors/NotFoundError/NotFoundError.tsx';


export type NotFoundPageProps = {};

const NotFoundPage: React.FC<NotFoundPageProps> = (props) => {
    const {} = props;

    return (
        <NotFoundError/>
    );
};

export default React.memo(NotFoundPage);