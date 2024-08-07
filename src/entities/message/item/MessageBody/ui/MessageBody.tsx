import { FC, memo } from 'react';
import { Image } from '@/shared/ui-kit/image/Image/ui/Image.tsx';
import { DomainMessageType } from 'product-types/dist/message/DomainMessage';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';
import classNames from 'classnames';
import css from './MessageBody.module.scss';


export type MessageBodyProps =
    {
        body: string;
        type: DomainMessageType;
        className?: string;
    };

export const MessageBody: FC<MessageBodyProps> = memo(function MessageBody (props) {
    const { body, type, className } = props;

    if (type === DomainMessageType.TEXT) {
        return body;
    } else if (type === DomainMessageType.IMAGE) {
        return (
            <Image
                alt=""
                className={ classNames(className, {}, [ css.image ]) }
                src={ body }
            />
        );
    } else if (type === DomainMessageType.LINK) {
        return (
            <Link
                className={ className }
                target="_blank"
                to={ body }
            >
                { body }
            </Link>
        );
    }

    return body;
});