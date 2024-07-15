import { FC, memo } from 'react';
import {
    FilesContainer,
} from '@/widgets/files/container/FilesContainer/ui/FilesContainer.tsx';


export const FilesPage: FC = memo(function FilesPage () {
    return (
        <FilesContainer/>
    );
});