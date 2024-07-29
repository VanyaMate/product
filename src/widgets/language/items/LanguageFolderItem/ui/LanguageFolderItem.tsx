import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './LanguageFolderItem.module.scss';
import {
    DomainLanguageFolder,
} from 'product-types/dist/language/DomainLanguageFolder';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    CreateLanguageWordFormModalButton,
} from '@/features/language/button/CreateLanguageWordFormModalButton/ui/CreateLanguageWordFormModalButton.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    $currentFolderId,
    getMyLanguageFolderWordsEffect,
} from '@/app/model/languages/languages.model.ts';
import {
    UpdateLanguageFolderFormModalButton,
} from '@/features/language/button/UpdateLanguageFolderFormModalButton/ui/UpdateLanguageFolderFormModalButton.tsx';
import {
    RemoveLanguageFolderButton,
} from '@/features/language/button/RemoveLanguageFolderButton/ui/RemoveLanguageFolderButton.tsx';
import { useStore } from '@vanyamate/sec-react';


export type LanguageFolderItemProps =
    {
        folder: DomainLanguageFolder;
    }
    & ComponentPropsWithoutRef<'div'>;

export const LanguageFolderItem: FC<LanguageFolderItemProps> = memo(function LanguageFolderItem (props) {
    const { folder, className, ...other } = props;
    const selectedFolderId                = useStore($currentFolderId);

    return (
        <section { ...other }
                 className={ classNames(css.container, {}, [ className ]) }>
            <Row>
                <ButtonWithLoading
                    onClick={ async () => getMyLanguageFolderWordsEffect(folder.id) }
                    styleType={ selectedFolderId === folder.id
                                ? ButtonStyleType.PRIMARY
                                : ButtonStyleType.GHOST }
                >
                    { folder.title }
                </ButtonWithLoading>
                <CreateLanguageWordFormModalButton folderId={ folder.id }/>
            </Row>
            <Row>
                <UpdateLanguageFolderFormModalButton folder={ folder }/>
                <RemoveLanguageFolderButton folderId={ folder.id }/>
            </Row>
        </section>
    );
});