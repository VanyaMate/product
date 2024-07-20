import { ComponentPropsWithoutRef, FC, memo, ReactNode, useRef } from 'react';
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
import {
    FilePreviewImage,
} from '@/entities/file/item/FilePreviewIcon/ui/FilePreviewImage.tsx';
import {
    FilePreviewAction,
} from '@/entities/file/item/FilePreviewAction/ui/FilePreviewAction.tsx';


export type FilePreviewProps =
    {
        file: DomainFile;
        extra?: ReactNode;
        selected?: boolean;
        onCardClick?: (file: DomainFile) => void;
    }
    & ComponentPropsWithoutRef<'div'>;

export const FilePreview: FC<FilePreviewProps> = memo(function FilePreview (props) {
    const { file, className, selected, onCardClick, ...other } = props;
    const actionRef                                            = useRef<HTMLDivElement>(null);

    return (
        <PopOver popover={ <FilePreviewShortInfo file={ file }/> }>
            <article
                { ...other }
                className={ classNames(css.container, { [css.selected]: selected }, [ className ]) }
                onClick={ (event) => {
                    if (!actionRef.current.contains(event.target as Node)) {
                        onCardClick(file);
                    }
                } }
                role="button"
                tabIndex={ 0 }
            >
                <div className={ css.header }>
                    <div className={ css.icon }>
                        <FilePreviewImage
                            preview={ file.filePath }
                            type={ file.fileType }
                        />
                    </div>
                    <div className={ css.action } ref={ actionRef }>
                        <FilePreviewAction file={ file }/>
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