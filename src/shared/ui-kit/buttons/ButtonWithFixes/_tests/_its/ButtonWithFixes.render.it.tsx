import { render, screen } from '@testing-library/react';
import { ButtonWithFixes } from '../../ui/ButtonWithFixes';


export default () => {
    render(
        <ButtonWithFixes post="Postfix" pref="Prefix">Simple</ButtonWithFixes>,
    );
    const prefix   = screen.getByText('Prefix');
    const postifx  = screen.getByText('Postfix');
    const children = screen.getByText('Simple');

    expect(prefix).toBeInTheDocument();
    expect(postifx).toBeInTheDocument();
    expect(children).toBeInTheDocument();
}