import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './DropdownPostMenu.module.scss';
import {
    RemovePostButton,
} from '@/features/post/button/RemovePostButton/ui/RemovePostButton.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';


export type DropdownPostMenuProps =
    {
        postId: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const DropdownPostMenu: FC<DropdownPostMenuProps> = memo(function DropdownPostMenu (props) {
    const { className, postId, ...other } = props;

    return (
        <Row { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            <RemovePostButton postId={ postId }/>
        </Row>
    );
});