import { ComponentPropsWithoutRef, FC, memo } from 'react';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    RemoveMessageButton,
} from '@/features/message/button/RemoveMessageButton/ui/RemoveMessageButton.tsx';


export type PrivateMessageActionsMenuProps =
    {
        messageId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateMessageActionsMenu: FC<PrivateMessageActionsMenuProps> = memo(function PrivateMessageActionsMenu (props) {
    const { messageId, ...other } = props;

    return (
        <Row { ...other }>
            <RemoveMessageButton messageId={ messageId }/>
        </Row>
    );
});