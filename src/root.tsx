import { createRoot } from 'react-dom/client';
import './styles/index.scss';
import RootApp from './apps/RootApp/RootApp.tsx';


const rootElement: HTMLElement | null = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(<RootApp/>);
}
