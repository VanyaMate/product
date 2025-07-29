import { type ComponentPropsWithoutRef, type FC, memo, useState } from 'react';
import classNames from 'classnames';
import css from './CreateArticleForm.module.scss';
import MDEditor from '@uiw/react-md-editor';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';


export type CreateArticleFormProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const CreateArticleForm: FC<CreateArticleFormProps> = memo(function CreateArticleForm (props) {
    const { className, ...other } = props;
    const [ value, setValue ]     = useState<string>('');

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            <MDEditor
                height={ 100 }
                onChange={ (value) => setValue(value) }
                textareaProps={ {
                    placeholder: 'Введите статью',
                } }
                value={ value }
            />
            <Button>Создать</Button>
        </div>
    );
});