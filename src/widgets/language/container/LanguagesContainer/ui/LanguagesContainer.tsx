import { ComponentPropsWithoutRef, FC, memo, useLayoutEffect } from 'react';
import classNames from 'classnames';
import css from './LanguagesContainer.module.scss';
import { useStore } from '@vanyamate/sec-react';
import {
    $currentFolderId,
    $languageFolderWordsList,
    $languagesList,
    getMyLanguagesEffect,
} from '@/app/model/languages/languages.model.ts';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    CreateLanguageFormModalButton,
} from '@/features/language/button/CreateLanguageFormModalButton/ui/CreateLanguageFormModalButton.tsx';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import {
    LanguageItem,
} from '@/widgets/language/items/LanguageItem/ui/LanguageItem.tsx';
import {
    LanguageWordItem,
} from '@/widgets/language/items/LanguageWordItem/ui/LanguageWordItem.tsx';
import { useTranslation } from 'react-i18next';
import {
    CreateLanguageWordForm,
} from '@/widgets/language/form/CreateLanguageWordForm/ui/CreateLanguageWordForm.tsx';

// TODO: TEmp
/* eslint-disable */

export type LanguagesContainerProps =
    {
        userId: string;
    }
    & ComponentPropsWithoutRef<'section'>;

export const LanguagesContainer: FC<LanguagesContainerProps> = memo(function LanguagesContainer (props) {
    const { className, userId, ...other } = props;
    const languages                       = useStore($languagesList);
    const selectedFolderId                = useStore($currentFolderId);
    const words                           = useStore($languageFolderWordsList);
    const { t }                           = useTranslation([ 'languages' ]);

    useLayoutEffect(() => {
        // Tempo
        getMyLanguagesEffect();
    }, []);

    return (
        <section
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
        >
            <Row>
                <h2>{ t('language_page_title') }</h2>
                <CreateLanguageFormModalButton/>
            </Row>
            <Row className={ css.content }>
                <Col className={ css.folders }>
                    {
                        languages.map((language) => (
                            <LanguageItem
                                open
                                key={ language.id }
                                language={ language }
                            />
                        ))
                    }
                </Col>
                <Col className={ css.words }>
                    {
                        selectedFolderId === ''
                        ? t('no_folder_selected')
                        : (
                            <>
                                <CreateLanguageWordForm
                                    folderId={ selectedFolderId }
                                />
                                {
                                    words.map((word) => (
                                        <LanguageWordItem
                                            key={ word.id }
                                            word={ word }
                                        />
                                    ))
                                }
                            </>
                        )
                    }
                </Col>
            </Row>
        </section>
    );
});