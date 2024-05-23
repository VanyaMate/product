import { FC, memo } from 'react';


export type NotificationItemBodyProps =
    {
        data: unknown;
        BodyComponent: FC<{ data: unknown }>,
        validationMethod: (data: unknown) => boolean;
    };

export const NotificationItemBody: FC<NotificationItemBodyProps> = memo(function NotificationItemBody (props) {
    const { validationMethod, BodyComponent, data } = props;

    return validationMethod(data)
           ? <BodyComponent data={ data }/>
           : <p>{ JSON.stringify(data) }</p>;
});