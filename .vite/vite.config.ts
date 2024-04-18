import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';


export default defineConfig(({ mode }) => ({
    plugins  : [ react() ],
    css      : {
        modules: {
            generateScopedName: '[name]_[local]_[hash:base64:5]',
        },
    },
    resolve  : {
        alias: {
            '@': '/src',
            '$': '/',
        },
    },
    define   : {
        __IS_DEV__ : JSON.stringify(mode === 'development'),
        __API__: JSON.stringify(
            mode === 'development'
            ? 'http://localhost:8000'
            : 'https://no-local-host:123',
        ),
    },
    publicDir: 'public',
    build    : {
        outDir   : 'dist',
        assetsDir: 'assets',
    },
}));
