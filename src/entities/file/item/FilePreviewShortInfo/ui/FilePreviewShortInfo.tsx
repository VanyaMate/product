import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './FilePreviewShortInfo.module.scss';
import { DomainFile } from 'product-types/dist/file/DomainFile';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type FilePreviewShortInfoProps =
    {
        file: DomainFile;
    }
    & ComponentPropsWithoutRef<'div'>;

export const FilePreviewShortInfo: FC<FilePreviewShortInfoProps> = memo(function FilePreviewShortInfo (props) {
    const { file, className, ...other } = props;
    const { t }                         = useTranslation();

    return (
        <div { ...other }
             className={ classNames(css.container, {}, [ className ]) }>
            <Col>
                <span
                    className={ css.label }>{ t.page.files.files_label_original_name }</span>
                <span>{ file.fileOriginalName }</span>
            </Col>
            <Col>
                <span
                    className={ css.label }>{ t.page.files.files_label_weight }</span>
                <span>{ file.fileWeight }</span>
            </Col>
            <Col>
                <span
                    className={ css.label }>{ t.page.files.files_label_type }</span>
                <span>{ file.fileType }</span>
            </Col>
            <Col>
                <span
                    className={ css.label }>{ t.page.files.files_label_owner }</span>
                <span>{ file.owner.login }</span>
            </Col>
            <Col>
                <span
                    className={ css.label }>{ t.page.files.files_label_upload_date }</span>
                <span>{ file.uploadDate }</span>
            </Col>
        </div>
    );
});