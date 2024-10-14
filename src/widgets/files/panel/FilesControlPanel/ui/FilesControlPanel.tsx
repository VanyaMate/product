import { Dropdown } from '@/shared/ui-kit/modal/Dropdown/ui/Dropdown.tsx';
import { ComponentPropsWithoutRef, FC, memo, useCallback } from 'react';
import classNames from 'classnames';
import css from './FilesControlPanel.module.scss';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import {
    IoChevronDown, IoChevronUp,
    IoSearch,
} from 'react-icons/io5';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    useDropdownController,
} from '@/shared/ui-kit/modal/Dropdown/hooks/useDropdownController.ts';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import {
    ButtonWithFixes,
} from '@/shared/ui-kit/buttons/ButtonWithFixes/ui/ButtonWithFixes.tsx';
import { TextInput } from '@/shared/ui-kit/input/TextInput/ui/TextInput.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';
import { useForm } from 'react-hook-form';
import { useDebounce } from '@/shared/hooks/useDebounce/useDebounce.ts';

// TODO: Что-то не очень красиво получается с выбором в меню.. Надо сделать
//  боковое меню


export type FilesControlPanelProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const FilesControlPanel: FC<FilesControlPanelProps> = memo(function FilesControlPanel (props) {
    const { className, ...other }    = props;
    const sortByDropdown             = useDropdownController();
    const filterByDropdown           = useDropdownController();
    const { t }                      = useTranslation();
    const debounce                   = useDebounce(300);
    const { handleSubmit, register } = useForm<{ search: string }>();
    const onSearchFile               = useCallback((search: string) => {
        console.log('Search file', search);
    }, []);

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <search className={ css.search } key="search">
                <form
                    onChange={ handleSubmit(({ search }) => debounce(() => onSearchFile(search))) }
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
                            minLength: 1, maxLength: 255, required: true,
                        }) }
                    />
                    <Row key="sort">
                        <Dropdown
                            controller={ sortByDropdown }
                            dropdownContent={
                                <Col>
                                    <Button
                                        styleType={ ButtonStyleType.PRIMARY }>Последние</Button>
                                    <Button
                                        styleType={ ButtonStyleType.GHOST }>Первые</Button>
                                    <Button
                                        styleType={ ButtonStyleType.GHOST }>Большие</Button>
                                    <Button
                                        styleType={ ButtonStyleType.GHOST }>Маленькие</Button>
                                </Col>
                            }
                        >
                            <ButtonWithFixes
                                post={
                                    sortByDropdown.opened
                                    ? <IoChevronUp/>
                                    : <IoChevronDown/>
                                }
                                styleType={ ButtonStyleType.GHOST }
                            >
                                Последние
                            </ButtonWithFixes>
                        </Dropdown>
                        <Dropdown
                            controller={ filterByDropdown }
                            dropdownContent={
                                <Col>
                                    <Button
                                        styleType={ ButtonStyleType.PRIMARY }>Все
                                        файлы</Button>
                                    <Button
                                        styleType={ ButtonStyleType.GHOST }>Файлы</Button>
                                    <Button
                                        styleType={ ButtonStyleType.GHOST }>Аудио</Button>
                                    <Button
                                        styleType={ ButtonStyleType.GHOST }>Видео</Button>
                                    <Button
                                        styleType={ ButtonStyleType.GHOST }>Картинки</Button>
                                </Col>
                            }
                        >
                            <ButtonWithFixes
                                post={
                                    filterByDropdown.opened
                                    ? <IoChevronUp/>
                                    : <IoChevronDown/>
                                }
                                styleType={ ButtonStyleType.GHOST }
                            >
                                Все файлы
                            </ButtonWithFixes>
                        </Dropdown>
                    </Row>
                </form>
            </search>
        </div>
    );
});