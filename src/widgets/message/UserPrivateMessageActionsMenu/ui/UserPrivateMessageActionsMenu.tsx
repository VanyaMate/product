import { ComponentPropsWithoutRef, FC, memo } from 'react';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    RemoveMessageButton,
} from '@/features/message/button/RemoveMessageButton/ui/RemoveMessageButton.tsx';


export type UserPrivateMessageActionsMenuProps =
    {
        messageId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const UserPrivateMessageActionsMenu: FC<UserPrivateMessageActionsMenuProps> = memo(function UserPrivateMessageActionsMenu (props) {
    const { messageId, ...other } = props;

    return (
        <Row { ...other }>
            <RemoveMessageButton messageId={ messageId }/>
        </Row>
    );
});