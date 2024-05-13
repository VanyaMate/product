import { createRoot } from 'react-dom/client';
import { App } from '@/app/ui/app.tsx';


const rootElement: HTMLElement | null = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(<App/>);
}
