import { ComponentPropsWithoutRef, FC, memo } from 'react';
import { DomainFile } from 'product-types/dist/file/DomainFile';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import classNames from 'classnames';
import css from './FilePreview.module.scss';
import { IoShieldCheckmark } from 'react-icons/io5';
import {
    FilePreviewShortInfo,
} from '@/entities/file/item/FilePreviewShortInfo/ui/FilePreviewShortInfo.tsx';
import {
    FilePreviewInfo,
} from '@/entities/file/item/FilePreviewInfo/ui/FilePreviewInfo.tsx';


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
                    <div className={ css.image }>
                        { file.fileOriginalName.split('.').slice(-1)[0] }
                    </div>
                    {
                        file.private
                        ? <div className={ css.private }>
                            <IoShieldCheckmark/>
                        </div>
                        : null
                    }
                </div>
                <FilePreviewInfo
                    size={ file.fileWeight }
                    title={ file.fileName }
                    type={ file.fileType }
                />
            </article>
        </PopOver>
    );
});