import { ComponentPropsWithoutRef, FC, memo, useLayoutEffect } from 'react';
import classNames from 'classnames';
import css from './LanguagesContainer.module.scss';
import { useStore } from '@vanyamate/sec-react';
import {
    $languageFolderWordsList,
    $languagesList,
    createLanguageEffect,
    createLanguageFolderEffect,
    createLanguageWordEffect,
    getMyLanguageFolderWordsEffect,
    getMyLanguagesEffect,
} from '@/app/model/languages/languages.model.ts';
import {
    InputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/ui/InputWithError.tsx';
import {
    useInputWithError,
} from '@/shared/ui-kit/inputs/InputWithError/hooks/useInputWithError.ts';
import { Form } from '@/shared/ui-kit/forms/Form/ui/Form.tsx';
import { useForm } from '@/shared/ui-kit/forms/Form/hooks/useForm.ts';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import { Details } from '@/shared/ui-kit/details/Details/ui/Details.tsx';
import {
    DetailsTitle,
} from '@/shared/ui-kit/details/Details/ui/DetailsTitle/DetailsTitle.tsx';
import {
    DetailsBody,
} from '@/shared/ui-kit/details/Details/ui/DetailsBody/DetailsBody.tsx';

/* eslint-disable */

export type LanguagesContainerProps =
    {
        userId: string;
    }
    & ComponentPropsWithoutRef<'section'>;

export const LanguagesContainer: FC<LanguagesContainerProps> = memo(function LanguagesContainer (props) {
    const { className, userId, ...other } = props;
    const languages                       = useStore($languagesList);
    const words                           = useStore($languageFolderWordsList);
    const createLanguageInput             = useInputWithError({
        name: 'title',
    });
    const createLanguageForm              = useForm<{ title: string }>({
        inputs  : [ createLanguageInput ],
        onSubmit: async (data) => createLanguageEffect(data).then(),
    });

    const createLanguageFolderInput   = useInputWithError({
        name: 'title',
    });
    const createLanguageIdFolderInput = useInputWithError({
        name: 'id',
    });
    const createLanguageFolderForm    = useForm<{ title: string, id: string }>({
        inputs  : [ createLanguageFolderInput, createLanguageIdFolderInput ],
        onSubmit: async (data) => createLanguageFolderEffect(data.id, { title: data.title }).then(),
    });

    const createLanguageWordInput            = useInputWithError({
        name: 'original',
    });
    const createLanguageWordTranlation1Input = useInputWithError({
        name: 'translation1',
    });
    const createLanguageWordTranlation2Input = useInputWithError({
        name: 'translation2',
    });
    const createLanguageWordNoticeInput      = useInputWithError({
        name: 'notice',
    });
    const createLanguageWordFormIdInput      = useInputWithError({
        name: 'id',
    });
    const createLanguageWordForm             = useForm<{
        original: string,
        translation1: string,
        translation2: string,
        notice: string,
        id: string
    }>({
        inputs  : [
            createLanguageWordInput,
            createLanguageWordTranlation1Input,
            createLanguageWordTranlation2Input,
            createLanguageWordNoticeInput,
            createLanguageWordFormIdInput,
        ],
        onSubmit: async (data) => createLanguageWordEffect(data.id, {
            notice      : data.notice,
            translations: [ data.translation1, data.translation2 ],
            original    : data.original,
        }).then(),
    });

    useLayoutEffect(() => {
        getMyLanguagesEffect();
    }, []);

    return (
        <section>
            <section>
                <p>create language</p>
                <Form controller={ createLanguageForm }>
                    <InputWithError controller={ createLanguageInput }
                                    placeholder={ 'title' }/>
                    <ButtonWithLoading
                        loading={ createLanguageForm.pending }
                        type="submit"
                    >
                        Создать
                    </ButtonWithLoading>
                </Form>
            </section>
            <section>
                <p>create folder</p>
                <Form controller={ createLanguageFolderForm }>
                    <InputWithError controller={ createLanguageFolderInput }
                                    placeholder={ 'title' }/>
                    <InputWithError controller={ createLanguageIdFolderInput }
                                    placeholder={ 'lang id' }/>
                    <ButtonWithLoading
                        loading={ createLanguageFolderForm.pending }
                        type="submit"
                    >
                        Создать
                    </ButtonWithLoading>
                </Form>
            </section>
            <section>
                <p>create word</p>
                <Form controller={ createLanguageWordForm }>
                    <InputWithError controller={ createLanguageWordInput }
                                    placeholder={ 'original' }/>
                    <InputWithError
                        controller={ createLanguageWordTranlation1Input }
                        placeholder={ 'translation 1' }/>
                    <InputWithError
                        controller={ createLanguageWordTranlation2Input }
                        placeholder={ 'translation 2' }/>
                    <InputWithError controller={ createLanguageWordNoticeInput }
                                    placeholder={ 'notice' }/>
                    <InputWithError controller={ createLanguageWordFormIdInput }
                                    placeholder={ 'id' }/>
                    <ButtonWithLoading
                        loading={ createLanguageWordForm.pending }
                        type="submit"
                    >
                        Создать
                    </ButtonWithLoading>
                </Form>
            </section>
            <h2>languages</h2>
            <ul { ...other }
                className={ classNames(css.container, {}, [ className ]) }>
                {
                    languages.map((language) => (
                        <li key={ language.id }>
                            <h3>{ language.title }</h3>
                            <p>{ language.id }</p>
                            <ul>
                                { language.folders.map((folder) => (
                                    <li key={ folder.id }
                                        onClick={ () => getMyLanguageFolderWordsEffect(folder.id) }>
                                        <h4>{ folder.title }</h4>
                                        <p>{ folder.id }</p>
                                    </li>
                                )) }
                            </ul>
                        </li>
                    ))
                }
            </ul>
            <h2>words</h2>
            <ul>
                {
                    words.map((word) => (
                        <li key={ word.id }>
                            <h3>{ word.original }</h3>
                            <p>{ word.notice }</p>
                            <Details>
                                <DetailsTitle>Перевод</DetailsTitle>
                                <DetailsBody>
                                    {
                                        word.translations.map((t, index) => (
                                            <div key={ index }>{ t }</div>))
                                    }
                                </DetailsBody>
                            </Details>
                        </li>
                    ))
                }
            </ul>
        </section>
    );
});