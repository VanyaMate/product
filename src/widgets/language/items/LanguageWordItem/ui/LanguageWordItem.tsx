import { FC, memo } from 'react';
import { DetailsProps } from '@/shared/ui-kit/details/Details/ui/Details.tsx';
import {
    DomainLanguageWord,
} from 'product-types/dist/language/DomainLanguageWord';
import {
    ControlDetails,
} from '@/shared/ui-kit/details/ControlDetails/ui/ControlDetails.tsx';
import { Row } from '@/shared/ui-kit/box/Row/ui/Row.tsx';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { IoCheckmark, IoClose } from 'react-icons/io5';
import { ButtonStyleType } from '@/shared/ui-kit/buttons/Button/types/types.ts';
import { Col } from '@/shared/ui-kit/box/Col/ui/Col.tsx';
import {
    UpdateLanguageWordFormModalButton,
} from '@/features/language/button/UpdateLanguageWordFormModalButton/ui/UpdateLanguageWordFormModalButton.tsx';
import {
    RemoveLanguageWordButton,
} from '@/features/language/button/RemoveLanguageWordButton/ui/RemoveLanguageWordButton.tsx';
import classNames from 'classnames';
import css from './LanguageWordItem.module.scss';
import {
    updateLanguageWordEffect,
} from '@/app/model/languages/languages.model.ts';
import { PopOver } from '@/shared/ui-kit/modal/PopOver/ui/PopOver.tsx';
import { useTranslation } from 'react-i18next';


export type LanguageWordItemProps =
    {
        word: DomainLanguageWord;
    }
    & DetailsProps;

export const LanguageWordItem: FC<LanguageWordItemProps> = memo(function LanguageWordItem (props) {
    const { word, className, ...other } = props;
    const { t }                         = useTranslation([ 'languages' ]);

    return (
        <ControlDetails
            { ...other }
            className={ classNames(css.container, {}, [ className ]) }
            titleChildren={
                <Row fullWidth spaceBetween>
                    <Row>
                        <PopOver popover={
                            word.checked ? t('uncheck_word') : t('check_word')
                        }>
                            <ButtonWithLoading
                                onClick={ () => updateLanguageWordEffect(word.id, { checked: !word.checked }) }
                                styleType={
                                    word.checked
                                    ? ButtonStyleType.SECOND
                                    : ButtonStyleType.GHOST
                                }
                            >
                                {
                                    word.checked ? <IoCheckmark/> : <IoClose/>
                                }
                            </ButtonWithLoading>
                        </PopOver>
                        <h4>{ word.original }</h4>
                    </Row>
                    <Row>
                        <UpdateLanguageWordFormModalButton word={ word }/>
                        <RemoveLanguageWordButton wordId={ word.id }/>
                    </Row>
                </Row>
            }
        >
            <Col className={ css.words }>
                {
                    word.notice ? <p
                        className={ css.notice }>{ word.notice }</p> : null
                }
                <ul className={ css.list }>
                    {
                        word.translations.map((translation, index) => (
                            <li key={ index }>{ translation }</li>
                        ))
                    }
                </ul>
            </Col>
        </ControlDetails>
    );
});