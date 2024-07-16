import { FC, memo } from 'react';
import { useStore } from '@vanyamate/sec-react';
import { $filesUploadList } from '@/app/model/file-page/file-page.model.ts';
import {
    FilePreload,
} from '@/entities/file/item/FilePreload/ui/FilePreload.tsx';


export const FilesUploadInsert: FC = memo(function FilesUploadInsert () {
    const filesUpload = useStore($filesUploadList);
    return filesUpload.map(([ file, progress ], index) => (
        <FilePreload
            key={ index }
            progress={ progress }
            size={ file.size }
            title={ file.name }
            type={ file.type }
        />
    ));
});