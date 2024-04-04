import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { delay } from '@/components/shared/tests/helpers/delay.ts';
import CounterReduxTestProvider
    from '@/components/entities/_temp_/Counter/__its__/providers/CounterReduxTestProvider/CounterReduxTestProvider.tsx';
import Counter from '@/components/entities/_temp_/Counter/Counter.tsx';


export default async () => {
    render(
        <CounterReduxTestProvider>
            <Counter/>
        </CounterReduxTestProvider>,
    );

    const valueContainer  = screen.getByRole('heading', { level: 1 });
    const incrementButton = screen.getByText('+');
    const decrementButton = screen.getByText('-');

    expect(valueContainer).toBeInTheDocument();
    expect(incrementButton).toBeInTheDocument();
    expect(decrementButton).toBeInTheDocument();
    expect(valueContainer).toHaveTextContent('0');

    await userEvent.click(incrementButton);
    await delay(0);
    expect(valueContainer).toHaveTextContent('1');


    await userEvent.click(decrementButton);
    await delay(0);
    expect(valueContainer).toHaveTextContent('0');
}