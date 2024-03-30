import { render, screen } from '@testing-library/react';
import ButtonWithFixes
    from '@/components/shared/ui/buttons/ButtonWithFixes/ButtonWithFixes.tsx';


export default () => {
    render(
        <ButtonWithFixes post="Postfix" pref="Prefix">Simple</ButtonWithFixes>,
    );
    const button = screen.getByText('PrefixSimplePostfix');
    expect(button).toBeInTheDocument();
}