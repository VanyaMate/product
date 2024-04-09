import { render, screen } from '@testing-library/react';
import Button from '@/components/shared/ui/buttons/Button/Button.tsx';
import { ButtonStyleType } from '@/components/shared/ui/buttons/Button/types/types.ts';
import css from '../../ui/Button.module.scss';


export default () => {
    render(
        <>
            <Button styleType={ ButtonStyleType.PRIMARY }>Primary</Button>
            <Button styleType={ ButtonStyleType.SECOND }>Second</Button>
            <Button styleType={ ButtonStyleType.GHOST }>Ghost</Button>
        </>,
    );

    const primaryButton = screen.getByText('Primary');
    const secondButton  = screen.getByText('Second');
    const ghostButton   = screen.getByText('Ghost');

    expect(primaryButton).toHaveClass(css.primary);
    expect(secondButton).toHaveClass(css.second);
    expect(ghostButton).toHaveClass(css.ghost);
}