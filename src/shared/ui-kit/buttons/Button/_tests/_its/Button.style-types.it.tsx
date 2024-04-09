import { render, screen } from '@testing-library/react';
import css from '../../ui/Button.module.scss';
import { Button } from '../../ui/Button';
import { ButtonStyleType } from '../../types/types';


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