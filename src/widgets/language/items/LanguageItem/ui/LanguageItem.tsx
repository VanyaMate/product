import { FC, memo } from 'react';
import css from './LanguageItem.module.scss';
import {
    DomainLanguageWithFolders,
} from 'product-types/dist/language/DomainLanguageWithFolders';
import {
    DetailsProps,
} from '@/shared/ui-kit/details/Details/ui/Details.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    RemoveLanguageButton,
} from '@/features/language/button/RemoveLanguageButton/ui/RemoveLanguageButton.tsx';
import {
    UpdateLanguageFormModalButton,
} from '@/features/language/button/UpdateLanguageFormModalButton/ui/UpdateLanguageFormModalButton.tsx';
import { IoChevronForward } from 'react-icons/io5';
import {
    CreateLanguageFolderFormModalButton,
} from '@/features/language/button/CreateLanguageFolderFormModalButton/ui/CreateLanguageFolderFormModalButton.tsx';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import {
    LanguageFolderItem,
} from '@/widgets/language/items/LanguageFolderItem/ui/LanguageFolderItem.tsx';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import {
    ControlDetails,
} from '@/shared/ui-kit/details/ControlDetails/ui/ControlDetails.tsx';
import { useTranslation } from '@/features/i18n/hook/useTranslation.ts';


export type LanguageItemProps =
    {
        language: DomainLanguageWithFolders;
    }
    & DetailsProps;

export const LanguageItem: FC<LanguageItemProps> = memo(function LanguageItem (props) {
    const { language, ...other } = props;
    const { t }                  = useTranslation();

    return (
        <ControlDetails
            { ...other }
            titleChildren={
                <Row fullWidth spaceBetween>
                    <Row>
                        <IoChevronForward className={ css.marker }/>
                        <h3>{ language.title }</h3>
                        <CreateLanguageFolderFormModalButton
                            languageId={ language.id }
                            styleType={ ButtonStyleType.GHOST }
                        />
                    </Row>
                    <Row>
                        <UpdateLanguageFormModalButton language={ language }/>
                        <RemoveLanguageButton languageId={ language.id }/>
                    </Row>
                </Row>
            }
        >
            <Col>
                {
                    language.folders.length
                    ? language.folders.map((folder) => (
                        <LanguageFolderItem
                            folder={ folder }
                            key={ folder.id }
                        />
                    ))
                    : t.page.languages.folders_not_exist
                }
            </Col>
        </ControlDetails>
    );
});