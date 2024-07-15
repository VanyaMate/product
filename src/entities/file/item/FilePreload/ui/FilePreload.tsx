import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './FilePreload.module.scss';
import {
    FilePreviewInfo,
} from '@/entities/file/item/FilePreviewInfo/ui/FilePreviewInfo.tsx';


export type FilePreloadProps =
    {
        title: string;
        type: string;
        size: number;
        progress: number;
    }
    & ComponentPropsWithoutRef<'div'>;

export const FilePreload: FC<FilePreloadProps> = memo(function FilePreload (props) {
    const { title, type, size, progress, className, ...other } = props;

    return (
        <article { ...other }
                 className={ classNames(css.container, {}, [ className ]) }>
            <div className={ css.header }>
                <div className={ css.percent }>
                    { progress.toFixed(0) }%
                </div>
                <div
                    className={ css.progress }
                    style={ { width: `${ progress }%` } }
                />
                <div className={ css.preview }>
                    { title.split('.').slice(-1)[0] }
                </div>
            </div>
            <FilePreviewInfo size={ size } title={ title } type={ type }/>
        </article>
    );
});