import { ComponentPropsWithoutRef, FC, memo } from 'react';
import classNames from 'classnames';
import css from './Image.module.scss';
import {
    ImageBorderType,
    ImageRadiusType,
} from '@/shared/ui-kit/image/Image/types/types.ts';


export type ImageProps =
    {
        alt: string;
        radius?: ImageRadiusType;
        border?: ImageBorderType;
    }
    & Omit<ComponentPropsWithoutRef<'img'>, 'alt'>

export const Image: FC<ImageProps> = memo(function Image (props) {
    const {
              radius = ImageRadiusType.SMALL,
              border = ImageBorderType.NONE,
              className,
              ...other
          } = props;

    return (
        <img
            { ...other }
            className={ classNames(css.container, {}, [ className, css[radius], css[border] ]) }
        />
    );
});