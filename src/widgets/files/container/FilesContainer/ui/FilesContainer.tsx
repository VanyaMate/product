import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useLayoutEffect,
} from 'react';
import classNames from 'classnames';
import css from './FilesContainer.module.scss';
import {
    $filesPending,
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
import {
    PageLoader,
} from '@/shared/ui-kit/loaders/PageLoader/ui/PageLoader.tsx';
import { useTitle } from '@/entities/site/hooks/useTitle/useTitle.ts';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type FilesContainerProps =
    {}
    & ComponentPropsWithoutRef<'div'>;

export const FilesContainer: FC<FilesContainerProps> = memo(function FilesContainer (props) {
    const { className, ...other } = props;
    const filesSelected           = useStore($filesSelected);
    const filesLoading            = useStore($filesPending);
    const setTitle                = useTitle();
    const { t, replace }          = useTranslation();

    useLayoutEffect(() => {
        if (filesSelected.length) {
            setTitle(
                replace(
                    t.page.files.selected_files_title,
                    {
                        amount: filesSelected.length.toString(),
                    },
                ),
            );
        } else {
            setTitle(t.app.files_page);
        }
    }, [ filesSelected, replace, setTitle, t.app.files_page, t.page.files.selected_files, t.page.files.selected_files_title ]);

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
                    {
                        filesLoading
                        ? <PageLoader/>
                        : <>
                            <FilesUploadInsert/>
                            <FilesInsert/>
                        </>
                    }
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