import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './DropdownPostMenu.module.scss';
import { IoRemove, IoSettings, IoShare } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    ButtonWithFixes,
} from '@/shared/ui-kit/buttons/ButtonWithFixes/ui/ButtonWithFixes.tsx';


export type DropdownPostMenuProps =
    {
        postId: string;
    }
    & ComponentPropsWithoutRef<'ul'>;

export const DropdownPostMenu: FC<DropdownPostMenuProps> = memo(function DropdownPostMenu (props) {
    const { className, postId, ...other } = props;

    console.log(postId);

    return (
        <ul { ...other }
            className={ classNames(css.container, {}, [ className ]) }>
            <li>
                <ButtonWithFixes
                    className={ css.row }
                    pref={ <IoRemove/> }
                    styleType={ ButtonStyleType.GHOST }
                >
                    { 'Удалить' + '' }
                </ButtonWithFixes>
            </li>
            <li>
                <ButtonWithFixes
                    className={ css.row }
                    pref={ <IoSettings/> }
                    styleType={ ButtonStyleType.GHOST }
                >
                    { 'Изменить' + '' }
                </ButtonWithFixes>
            </li>
            <li>
                <ButtonWithFixes
                    className={ css.row }
                    pref={ <IoShare/> }
                    styleType={ ButtonStyleType.GHOST }
                >
                    { 'Поделиться' + '' }
                </ButtonWithFixes>
            </li>
        </ul>
    );
});