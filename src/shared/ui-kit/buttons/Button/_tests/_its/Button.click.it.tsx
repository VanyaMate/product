import { fireEvent, render } from '@testing-library/react';
import { Button } from '../../ui/Button';


export default () => {
    const clickHandler  = jest.fn();
    const { getByRole } = render(
        <Button onClick={ clickHandler }>Simple</Button>,
    );
    const button        = getByRole('button');

    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(clickHandler).toHaveBeenCalledTimes(1);
    fireEvent.click(button);
    expect(clickHandler).toHaveBeenCalledTimes(2);
}