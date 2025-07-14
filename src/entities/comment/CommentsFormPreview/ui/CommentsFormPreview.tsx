import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './CommentsFormPreview.module.scss';
import {
    DomainCommentCreateData,
} from 'product-types/dist/comment/DomainCommentCreateData';


export type CommentsFormPreviewProps =
    {
        onSubmitHandler: (createData: DomainCommentCreateData) => Promise<any>;
    }
    & ComponentPropsWithoutRef<'div'>;

export const CommentsFormPreview: FC<CommentsFormPreviewProps> = memo(function CommentsFormPreview (props) {
    const {
              className,
              children,
              ...other
          } = props;

    return (
        <section
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            { children }
        </section>
    );
});