import { FC, memo } from 'react';
import {
    IoDocument,
    IoFilmOutline,
    IoMusicalNotes,
} from 'react-icons/io5';
import { Image } from '@/shared/ui-kit/image/Image/ui/Image.tsx';
import css from './FilePreviewImage.module.scss';
import classNames from 'classnames';
import {
    getStaticFilesUrl,
} from '@/app/api/getStaticFilesUrl/getStaticFilesUrl.ts';


export type FilePreviewIconProps =
    {
        type: string;
        ext: string;
        preview: string;
    };

export const FilePreviewImage: FC<FilePreviewIconProps> = memo(function FilePreviewIcon (props) {
    const { type, ext, preview } = props;
    const mainType               = type.split('/')[0];

    if (mainType === 'image') {
        return (
            <div className={ css.container }>
                <Image
                    alt="preview"
                    className={ classNames(css.image, {}, [ css.icon ]) }
                    src={ getStaticFilesUrl(preview) }
                />
            </div>
        );
    }

    return (
        <div className={ css.container }>
            {
                (() => {
                    switch (mainType) {
                        case 'video':
                            return <IoFilmOutline className={ css.icon }/>;
                        case 'audio':
                            return <IoMusicalNotes className={ css.icon }/>;
                        default:
                            return <IoDocument className={ css.icon }/>;
                    }
                })()
            }
            <span className={ css.ext }>
                { ext }
            </span>
        </div>
    );
});