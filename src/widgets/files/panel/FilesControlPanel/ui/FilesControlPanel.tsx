import { ComponentPropsWithoutRef, FC, memo, useCallback } from 'react';
import classNames from 'classnames';
import css from './FilesControlPanel.module.scss';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoSearch } from 'react-icons/io5';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { useForm } from 'react-hook-form';
import { useDebounce } from '@/shared/hooks/useDebounce/useDebounce.ts';
import { Select } from '@/shared/ui-kit/select/Select/ui/Select.tsx';

// TODO: Что-то не очень красиво получается с выбором в меню.. Надо сделать
//  боковое меню


export type FilesControlPanelProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const FilesControlPanel: FC<FilesControlPanelProps> = memo(function FilesControlPanel (props) {
    const { className, ...other } = props;
    const { t } = useTranslation();
    const debounce = useDebounce(300);
    const { handleSubmit, register } = useForm<{
        search: string,
        sort: string,
        type: string
    }>();
    const onSearchFile = useCallback((search: {
        search: string,
        sort: string,
        type: string
    }) => {
        console.log('Search file by:', search);
    }, []);

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <search className={ css.search } key="search">
                <form
                    onChange={ handleSubmit((data) => debounce(() => onSearchFile(data))) }
                >
                    <ButtonWithLoading
                        disabled
                        loading={ false }
                        quad
                    >
                        <IoSearch/>
                    </ButtonWithLoading>
                    <TextInput
                        placeholder={ t.page.files.find_file_by_title }
                        type="text"
                        { ...register('search', {
                            minLength: 1, maxLength: 255,
                        }) }
                    />
                    <Row key="sort">
                        <Select
                            buttonProps={ { styleType: ButtonStyleType.GHOST } }
                            className={ css.select }
                            initialValue="date:desc"
                            options={ [
                                { textLabel: 'Последние', value: 'date:desc' },
                                { textLabel: 'Первые', value: 'date:asc' },
                                { textLabel: 'Большие', value: 'size:desc' },
                                { textLabel: 'Маленькие', value: 'size:asc' },
                            ] }
                            { ...register('sort') }
                        />
                        <Select
                            buttonProps={ { styleType: ButtonStyleType.GHOST } }
                            className={ css.select }
                            initialValue="type:all"
                            options={ [
                                { textLabel: 'Все файлы', value: 'type:all' },
                                { textLabel: 'Документы', value: 'type:doc' },
                                { textLabel: 'Аудио', value: 'type:audio' },
                                { textLabel: 'Видео', value: 'type:video' },
                                { textLabel: 'Картинки', value: 'type:image' },
                            ] }
                            { ...register('type') }
                        />
                    </Row>
                </form>
            </search>
        </div>
    );
});