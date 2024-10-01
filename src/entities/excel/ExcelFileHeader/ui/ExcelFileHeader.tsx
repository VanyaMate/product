import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './ExcelFileHeader.module.scss';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';


export type ExcelFileHeaderProps =
    {
        fileName: string;
        clearFile: () => Promise<any>;
    }
    & ComponentPropsWithoutRef<'section'>;

export const ExcelFileHeader: FC<ExcelFileHeaderProps> = memo(function ExcelFileHeader (props) {
    const { className, fileName, clearFile, ...other } = props;

    return (
        <section { ...other }
                 className={ classNames(css.container, {}, [ className ]) }>
            <h2>Файл: <span>{ fileName }</span></h2>
            <ButtonWithLoading
                onClick={ clearFile }
            >
                Очистить
            </ButtonWithLoading>
        </section>
    );
});