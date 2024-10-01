import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './ExcelFileResponseCard.module.scss';
import { Link } from '@/shared/ui-kit/links/Link/ui/Link.tsx';


export type ExcelFileResponseCardProps =
    {
        fileName: string;
        fileSize: number;
        selectedSheet: string;
        selectedColumns: Array<string>;
        rowsPerFile: number;
        filePath: string;
    }
    & ComponentPropsWithoutRef<'div'>;

export const ExcelFileResponseCard: FC<ExcelFileResponseCardProps> = memo(function ExcelFileResponseCard (props) {
    const {
              className,
              fileName,
              fileSize,
              selectedColumns,
              selectedSheet,
              rowsPerFile,
              filePath,
              ...other
          } = props;

    return (
        <article { ...other }
                 className={ classNames(css.container, {}, [ className ]) }>
            <h3>{ fileName }</h3>
            <p><span>Таблица: </span>{ selectedSheet }</p>
            <p><span>Строк в файле: </span>{ rowsPerFile }</p>
            <p><span>Размер: </span>{ fileSize } б.</p>
            <p>
                <span>Поля:</span>
            </p>
            <ul>
                {
                    selectedColumns.map((col, index) => (
                        <li key={ index }>{ col }</li>),
                    )
                }
            </ul>
            <Link
                download={ fileName }
                to={ filePath }
            >
                Скачать
            </Link>
        </article>
    );
});