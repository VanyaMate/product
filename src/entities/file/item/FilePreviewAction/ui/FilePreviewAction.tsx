import { ComponentPropsWithoutRef, FC, memo, useMemo } from 'react';
import classNames from 'classnames';
import css from './FilePreviewAction.module.scss';
import { DomainFile } from 'product-types/dist/file/DomainFile';
import { IoDownload, IoExpand, IoPlay } from 'react-icons/io5';
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import {
    ButtonSizeType,
    ButtonStyleType,
} from '@/shared/ui-kit/buttons/Button/types/types.ts';


export type FilePreviewActionProps =
    {
        file: DomainFile;
    }
    & ComponentPropsWithoutRef<'div'>;

export const FilePreviewAction: FC<FilePreviewActionProps> = memo(function FilePreviewAction (props) {
    const { file, className, ...other } = props;
    const mainType                      = useMemo(() => file.fileType.split('/')[0], [ file ]);

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            <Button
                className={ css.button }
                size={ ButtonSizeType.LARGE }
                styleType={ ButtonStyleType.GHOST }
            >
                {
                    (() => {
                        switch (mainType) {
                            case 'video':
                                return <IoPlay/>;
                            case 'audio':
                                return <IoPlay/>;
                            case 'image':
                                return <IoExpand/>;
                            default:
                                return <IoDownload/>;
                        }
                    })()
                }
            </Button>
        </div>
    );
});