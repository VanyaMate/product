import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './UserContactInfoChangeForm.module.scss';


export type UserContactInfoChangeFormProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const UserContactInfoChangeForm: FC<UserContactInfoChangeFormProps> = memo(function UserContactInfoChangeForm (props) {
    const { className, ...other } = props;

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            ..
        </div>
    );
});