import { createRoot } from 'react-dom/client';
import '@/shared/styles/index.scss';
import { App } from '@/app';


const rootElement: HTMLElement | null = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(<App/>);
}
