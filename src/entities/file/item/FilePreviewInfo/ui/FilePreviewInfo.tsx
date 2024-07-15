import { ComponentPropsWithoutRef, FC, memo } from 'react';
import css from './FilePreviewInfo.module.scss';
import classNames from 'classnames';


export type FilePreviewInfoProps =
    {
        title: string;
        type: string;
        size: number;
    }
    & ComponentPropsWithoutRef<'header'>;

export const FilePreviewInfo: FC<FilePreviewInfoProps> = memo(function FilePreviewInfo (props) {
    const { title, type, size, className, ...other } = props;

    return (
        <header
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <h3 className={ css.title }>{ title }</h3>
            <p className={ css.type }>{ type }</p>
            <p className={ css.size }>{ (size / 1e6).toFixed(2) + ' mb' }</p>
        </header>
    );
});