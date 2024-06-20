import { FC, memo } from 'react';
import { Image } from '@/shared/ui-kit/image/Image/ui/Image.tsx';
import { DomainMessageType } from 'product-types/dist/message/DomainMessage';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';


export type MessageBodyProps =
    {
        body: string;
        type: DomainMessageType;
        className?: string;
    };

export const MessageBody: FC<MessageBodyProps> = memo(function MessageBody (props) {
    const { body, type, className } = props;

    switch (type) {
        case DomainMessageType.TEXT:
            return body;
        case DomainMessageType.IMAGE:
            return <Image alt="" className={ className } src={ body }/>;
        case DomainMessageType.LINK:
            return (
                <Link
                    className={ className }
                    target="_blank"
                    to={ body }
                >
                    { body }
                </Link>
            );
        default:
            return body;
    }
});