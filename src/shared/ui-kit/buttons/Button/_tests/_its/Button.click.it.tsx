import { render, screen } from '@testing-library/react';
import Button from '@/components/shared/ui/buttons/Button/Button.tsx';


export default () => {
    render(<Button>Simple</Button>);
    expect(screen.getByText('Simple')).toBeInTheDocument();
}