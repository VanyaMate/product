import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './FakeAvatar.module.scss';


export type FakeAvatarProps =
    {
        letter: string;
    }
    & ComponentPropsWithoutRef<'span'>;

export const FakeAvatar: FC<FakeAvatarProps> = memo(function FakeAvatar (props) {
    const { className, letter, ...other } = props;

    return (
        <span
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
             { letter }
        </span>
    );
});