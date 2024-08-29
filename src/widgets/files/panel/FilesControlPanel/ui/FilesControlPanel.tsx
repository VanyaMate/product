import { Dropdown } from '@/shared/ui-kit/modal/Dropdown/ui/Dropdown.tsx';
import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './FilesControlPanel.module.scss';
import {
    InputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/ui/InputWithError.tsx';
import {
    useInputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import {
    IoArrowRedo,
    IoChevronDown, IoChevronUp,
    IoSearch,
} from 'react-icons/io5';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import { useStore } from '@vanyamate/sec-react';
import { $filesSelected } from '@/app/model/file-page/file-page.model.ts';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    useDropdownController,
} from '@/shared/ui-kit/modal/Dropdown/hooks/useDropdownController.ts';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import {
    ButtonWithFixes,
} from '@/shared/ui-kit/buttons/ButtonWithFixes/ui/ButtonWithFixes.tsx';
import {
    RemoveFilesButton,
} from '@/features/file/button/RemoveFilesButton/ui/RemoveFilesButton.tsx';
import {
    UnselectAllFilesButton,
} from '@/features/file/button/UnselectAllFilesButton/ui/UnselectAllFilesButton.tsx';

// TODO: Что-то не очень красиво получается с выбором в меню.. Надо сделать
//  боковое меню


export type FilesControlPanelProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const FilesControlPanel: FC<FilesControlPanelProps> = memo(function FilesControlPanel (props) {
    const { className, ...other } = props;
    const filesSelected           = useStore($filesSelected);
    const filesSearch             = useInputWithError({
        debounce: 200,
        name    : 'search',
    });
    const sortByDropdown          = useDropdownController();
    const filterByDropdown        = useDropdownController();

    return (
        <div
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <Row className={ css.search } key="search">
                <ButtonWithLoading
                    disabled
                    loading={ false }
                    quad
                >
                    <IoSearch/>
                </ButtonWithLoading>
                <InputWithError
                    controller={ filesSearch }
                    placeholder="Введите название файла"
                />
            </Row>
            <Row className={ css.control }>
                <Row
                    className={ classNames(css.selected, { [css.opened]: filesSelected.length }) }
                >
                    <span
                        className={ css.counter }>Выбрано { filesSelected.length }</span>
                    <Button quad>
                        <IoArrowRedo/>
                    </Button>
                    <UnselectAllFilesButton/>
                    <RemoveFilesButton
                        filesIds={ filesSelected.map(({ id }) => id) }
                    />
                </Row>
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
            </Row>
        </div>
    );
});