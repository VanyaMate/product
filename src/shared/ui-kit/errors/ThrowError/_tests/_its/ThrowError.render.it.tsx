import { render, screen } from '@testing-library/react';
import { ThrowError } from '../../ui/ThrowError';
import { translations } from '@/features/i18n/config/translations.ts';
import { getCurrentLanguage } from '@/features/i18n/lib/getCurrentLanguage.ts';


export default () => {
    render(<ThrowError message="message" trace="trace"/>);

    const errorTitle   = screen.getByText(translations[getCurrentLanguage()].app.error_boundary_title);
    const errorMessage = screen.getByText('message');
    const errorTrace   = screen.getByText('trace');

    expect(errorTitle).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
    expect(errorTrace).toBeInTheDocument();
}