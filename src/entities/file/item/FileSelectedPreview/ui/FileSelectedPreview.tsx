import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './FileSelectedPreview.module.scss';
import { DomainFile } from 'product-types/dist/file/DomainFile';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import {
    FilePreviewShortInfo,
} from '@/entities/file/item/FilePreviewShortInfo/ui/FilePreviewShortInfo.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    FilePreviewImage,
} from '@/entities/file/item/FilePreviewIcon/ui/FilePreviewImage.tsx';
import {
    FilePreviewInfo,
} from '@/entities/file/item/FilePreviewInfo/ui/FilePreviewInfo.tsx';
import { IoClose } from 'react-icons/io5';


export type FileSelectedPreviewProps =
    {
        file: DomainFile;
        onCardClick?: (file: DomainFile) => void;
    }
    & ComponentPropsWithoutRef<'div'>;

export const FileSelectedPreview: FC<FileSelectedPreviewProps> = memo(function FileSelectedPreview (props) {
    const { className, file, onCardClick, ...other } = props;

    return (
        <PopOver
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            popover={ <FilePreviewShortInfo file={ file }/> } { ...other }
        >
            <article
                onClick={ () => onCardClick?.(file) }
                tabIndex={ 0 }
            >
                <Row>
                    <div className={ css.icon }>
                        <FilePreviewImage
                            ext={ file.fileName.split('.').slice(-1)[0] }
                            preview={ file.filePath }
                            type={ file.fileType }
                        />
                        <div className={ css.remove }>
                            <IoClose/>
                        </div>
                    </div>
                    <FilePreviewInfo
                        size={ file.fileWeight }
                        title={ file.fileName }
                        type={ file.fileType }
                    />
                </Row>
            </article>
        </PopOver>
    );
});