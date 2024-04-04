import { render, screen } from '@testing-library/react';
import Counter from '@/components/entities/Counter/Counter.tsx';
import CounterReduxTestProvider
    from '@/components/entities/Counter/__its__/providers/CounterReduxTestProvider/CounterReduxTestProvider.tsx';
import { userEvent } from '@testing-library/user-event';
import { delay } from '@/components/shared/tests/helpers/delay.ts';


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