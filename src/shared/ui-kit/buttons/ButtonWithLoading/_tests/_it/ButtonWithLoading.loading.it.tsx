import { fireEvent, render, waitFor } from '@testing-library/react';
import {
    ButtonWithLoading,
} from '@/shared/ui-kit/buttons/ButtonWithLoading/ui/ButtonWithLoading.tsx';
import css from '../../ui/ButtonWithLoading.module.scss';


export default async () => {
    const handler      = jest.fn();
    const asyncHandler = async function () {
        handler();
    };

    const { getByRole } = render(
        <ButtonWithLoading onClick={ asyncHandler }/>,
    );
    const button        = getByRole('button');

    fireEvent.click(button);

    expect(button.classList.contains(css.pending)).toBe(true);

    await waitFor(() => {
        expect(button.classList.contains(css.pending)).toBe(false);
    });

    expect(handler).toHaveBeenCalledTimes(1);
}