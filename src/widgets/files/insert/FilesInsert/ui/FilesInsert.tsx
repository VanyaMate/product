import { FC, memo } from 'react';
import { useStore } from '@vanyamate/sec-react';
import {
    $filesList,
    $filesSelected, selectFileEffect,
} from '@/app/model/file-page/file-page.model.ts';
import {
    FilePreview,
} from '@/entities/file/item/FilePreview/ui/FilePreview.tsx';


export const FilesInsert: FC = memo(function FilesInsert () {
    const filesList     = useStore($filesList);
    const filesSelected = useStore($filesSelected);

    return filesList.map((file) => (
        <FilePreview
            file={ file }
            key={ file.id }
            onCardClick={ selectFileEffect }
            selected={ filesSelected.some((selected) => selected.id === file.id) }
        />
    ));
});