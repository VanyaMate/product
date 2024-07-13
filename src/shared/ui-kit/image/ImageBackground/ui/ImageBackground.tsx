import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './ImageBackground.module.scss';


export type ImageBackgroundProps =
    {
        alt: string;
    }
    & Omit<ComponentPropsWithoutRef<'img'>, 'alt'>;

export const ImageBackground: FC<ImageBackgroundProps> = memo(function ImageBackground (props) {
    const { alt, src, className, ...other } = props;

    return (
        <div
            { ...other }
            aria-label={ alt }
            className={ classNames(css.container, {}, [ className ]) }
            style={ { backgroundImage: `url(${ src })` } }
        />
    );
});