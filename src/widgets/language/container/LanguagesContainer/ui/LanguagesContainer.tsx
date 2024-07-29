import {
    ComponentPropsWithoutRef,
    FC,
    memo,
    useLayoutEffect,
    useState,
} from 'react';
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
import { Button } from '@/shared/ui-kit/buttons/Button/ui/Button.tsx';
import { IoClose, IoReorderFour } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { Dropdown } from '@/shared/ui-kit/modal/Dropdown/ui/Dropdown.tsx';
import {
    useDropdownController,
} from '@/shared/ui-kit/modal/Dropdown/hooks/useDropdownController.ts';

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
    const [ revert, setRevert ]           = useState<boolean>(false);
    const { t }                           = useTranslation([ 'languages', 'buttons' ]);
    const dropdownController              = useDropdownController();

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
                        languages.length
                        ? languages.map((language) => (
                            <LanguageItem
                                open
                                key={ language.id }
                                language={ language }
                            />
                        ))
                        : t('languages_not_exist')
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
                                    className={ css.form }
                                />
                                <Row spaceBetween fullWidth>
                                    <span>
                                        {
                                            t('words_checked', {
                                                remember: words.reduce((acc, item) => acc + Number(item.checked), 0),
                                                all     : words.length,
                                            })
                                        }
                                    </span>
                                    <Dropdown
                                        controller={ dropdownController }
                                        dropdownContent={
                                            <Col>
                                                <Button
                                                    onClick={ () => setRevert(false) }
                                                    styleType={
                                                        revert
                                                        ? ButtonStyleType.GHOST
                                                        : ButtonStyleType.PRIMARY
                                                    }
                                                >
                                                    { t('order_new_to_old', { ns: 'buttons' }) }
                                                </Button>
                                                <Button
                                                    onClick={ () => setRevert(true) }
                                                    styleType={
                                                        revert
                                                        ? ButtonStyleType.PRIMARY
                                                        : ButtonStyleType.GHOST
                                                    }
                                                >
                                                    { t('order_old_to_new', { ns: 'buttons' }) }
                                                </Button>
                                            </Col>
                                        }
                                    >
                                        <Button
                                            styleType={ ButtonStyleType.GHOST }
                                            quad
                                        >
                                            {
                                                dropdownController.opened
                                                ? <IoClose/>
                                                : <IoReorderFour/>
                                            }
                                        </Button>
                                    </Dropdown>
                                </Row>
                                <Col
                                    className={ classNames(css.list, { [css.revert]: revert }) }>
                                    {
                                        words.length
                                        ? words.map((word) => (
                                            <LanguageWordItem
                                                key={ word.id }
                                                word={ word }
                                            />
                                        ))
                                        : t('words_not_exits')
                                    }
                                </Col>
                            </>
                        )
                    }
                </Col>
            </Row>
        </section>
    );
});