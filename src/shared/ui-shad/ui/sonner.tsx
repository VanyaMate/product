import { Toaster as Sonner } from 'sonner';
import { createPortal } from 'react-dom';
import { useTheme } from '@/app/theme/hooks/useTheme.ts';
import css from './sonner.module.scss';
import { ComponentProps } from 'react';


type ToasterProps = ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
    const theme = useTheme();

    return createPortal(
        <Sonner
            className="toaster group"
            theme={ theme as ToasterProps['theme'] }
            toastOptions={ {
                classNames: {
                    toast       :
                        `group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg`,
                    description : 'group-[.toast]:text-muted-foreground',
                    actionButton:
                        'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
                    cancelButton:
                        'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
                    content     : css.container,
                },
            } }
            { ...props }
        />
        , document.body,
    );
};

export { Toaster };
