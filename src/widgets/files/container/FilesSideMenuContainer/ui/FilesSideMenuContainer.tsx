import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './FilesSideMenuContainer.module.scss';
import { useStore } from '@vanyamate/sec-react';
import {
    $filesSelected,
    selectFileEffect,
} from '@/app/model/file-page/file-page.model.ts';
import {
    FileSelectedPreview,
} from '@/entities/file/item/FileSelectedPreview/ui/FileSelectedPreview.tsx';
import { useTranslation } from 'react-i18next';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import { Details } from '@/shared/ui-kit/details/Details/ui/Details.tsx';
import {
    DetailsTitle,
} from '@/shared/ui-kit/details/Details/ui/DetailsTitle/DetailsTitle.tsx';
import {
    DetailsBody,
} from '@/shared/ui-kit/details/Details/ui/DetailsBody/DetailsBody.tsx';

/* eslint-disable */
// TODO: Tempo disable

export type FilesSideMenuContainerProps =
    {}
    & ComponentPropsWithoutRef<'section'>;

export const FilesSideMenuContainer: FC<FilesSideMenuContainerProps> = memo(function FilesSideMenuContainer (props) {
    const { className, ...other } = props;
    const filesSelected           = useStore($filesSelected);
    const { t }                   = useTranslation([ 'files-page' ]);

    return (
        <section
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <h3 className={ css.title }>{ t('selected_files') }</h3>
            <Details open>
                <DetailsTitle>Подробности</DetailsTitle>
                <DetailsBody>
                    <Row className={ css.details }>
                        <p className={ css.label }>Количество файлов</p>
                        <p className={ css.value }>{ filesSelected.length }</p>
                    </Row>
                    <Row className={ css.details }>
                        <p className={ css.label }>Общий вес</p>
                        <p className={ css.value }>{ (filesSelected.reduce((acc, file) => acc += file.fileWeight, 0) / 1e6).toFixed(2) } mb</p>
                    </Row>
                </DetailsBody>
            </Details>
            <div className={ css.list }>
                {
                    filesSelected.map((file) => (
                        <FileSelectedPreview
                            file={ file }
                            key={ file.id }
                            onCardClick={ selectFileEffect }
                        />
                    ))
                }
            </div>
        </section>
    );
});