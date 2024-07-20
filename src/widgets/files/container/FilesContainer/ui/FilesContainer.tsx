import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useLayoutEffect,
} from 'react';
import classNames from 'classnames';
import css from './FilesContainer.module.scss';
import {
    $filesSelected,
    getMyFilesEffect,
} from '@/app/model/file-page/file-page.model.ts';
import {
    FileUploadForm,
} from '@/widgets/files/form/FileUploadForm/ui/FileUploadForm.tsx';
import {
    FilesUploadInsert,
} from '@/widgets/files/insert/FilesUploadInsert/ui/FilesUploadInsert.tsx';
import {
    FilesInsert,
} from '@/widgets/files/insert/FilesInsert/ui/FilesInsert.tsx';
import {
    FilesControlPanel,
} from '@/widgets/files/panel/FilesControlPanel/ui/FilesControlPanel.tsx';
import { useStore } from '@vanyamate/sec-react';
import {
    FilesSideMenuContainer,
} from '@/widgets/files/container/FilesSideMenuContainer/ui/FilesSideMenuContainer.tsx';


export type FilesContainerProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const FilesContainer: FC<FilesContainerProps> = memo(function FilesContainer (props) {
    const { className, ...other } = props;
    const filesSelected           = useStore($filesSelected);

    useLayoutEffect(() => {
        getMyFilesEffect({});
    }, []);

    return (
        <div
            { ...other }
            className={ classNames(css.container, { [css.container_opened]: filesSelected.length }, [ className ]) }
        >
            <div className={ css.files }>
                <FileUploadForm/>
                <FilesControlPanel className={ css.control }/>
                <div className={ css.list }>
                    <FilesUploadInsert/>
                    <FilesInsert/>
                </div>
            </div>
            <div className={ css.sideMenu }>
                <div className={ css.sideMenu_content }>
                    <FilesSideMenuContainer/>
                </div>
            </div>
        </div>
    );
});