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