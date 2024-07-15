import { ComponentPropsWithoutRef, FC, memo } from 'react';
import { DomainFile } from 'product-types/dist/file/DomainFile';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import classNames from 'classnames';
import css from './FilePreview.module.scss';
import { IoShieldCheckmark } from 'react-icons/io5';
import {
    FilePreviewShortInfo,
} from '@/entities/file/item/FilePreviewShortInfo/ui/FilePreviewShortInfo.tsx';


export type FilePreviewProps =
    {
        file: DomainFile;
    }
    & ComponentPropsWithoutRef<'div'>;

export const FilePreview: FC<FilePreviewProps> = memo(function FilePreview (props) {
    const { file, className, ...other } = props;

    return (
        <PopOver popover={ <FilePreviewShortInfo file={ file }/> }>
            <article { ...other }
                     className={ classNames(css.container, {}, [ className ]) }>
                <div className={ css.header }>
                    <div className={ css.image }/>
                    {
                        file.private
                        ? <div className={ css.private }>
                            <IoShieldCheckmark/>
                        </div>
                        : null
                    }
                </div>
                <header className={ css.info }>
                    <h3 className={ css.title }>{ file.fileName }</h3>
                </header>
            </article>
        </PopOver>
    );
});