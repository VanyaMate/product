import { render, screen } from '@testing-library/react';
import { Button } from '../../ui/Button';


export default () => {
    render(<Button>Simple</Button>);
    expect(screen.getByText('Simple')).toBeInTheDocument();
}