import { ComponentPropsWithoutRef, FC, memo } from 'react';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import { IoShare } from 'react-icons/io5';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';


export type PrivateMessageActionsMenuProps =
    {
        messageId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const PrivateMessageActionsMenu: FC<PrivateMessageActionsMenuProps> = memo(function PrivateMessageActionsMenu (props) {
    const { ...other } = props;

    return (
        <Row { ...other }>
            <Button quad><IoShare/></Button>
        </Row>
    );
});