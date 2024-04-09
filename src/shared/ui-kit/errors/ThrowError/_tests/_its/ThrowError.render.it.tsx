import { render, screen } from '@testing-library/react';
import ThrowError from '@/components/shared/ui/errors/ThrowError/ThrowError.tsx';
import { useTranslation } from 'react-i18next';
import { Mock } from 'jest-mock';


export default () => {
    const useTranslationSpy: Mock = useTranslation as Mock;
    const tSpy                    = jest.fn((str) => str);

    useTranslationSpy.mockReturnValue({
        t   : tSpy,
        i18n: {
            changeLanguage: async () => {
            },
        },
    });

    render(<ThrowError message="message" trace="trace"/>);

    const errorTitle   = screen.getByText('error_boundary_title');
    const errorMessage = screen.getByText('message');
    const errorTrace   = screen.getByText('trace');

    expect(errorTitle).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
    expect(errorTrace).toBeInTheDocument();

    expect(tSpy).toHaveBeenCalledTimes(1);
    expect(tSpy).toHaveBeenLastCalledWith('error_boundary_title');
}