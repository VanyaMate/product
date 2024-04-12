import { createRoot } from 'react-dom/client';
import { App } from '@/app';


const rootElement: HTMLElement | null = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(<App/>);
}
