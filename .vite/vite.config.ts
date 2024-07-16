import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import VitePluginBundleMonitoring from 'vite-plugin-bundle-monitoring';


export default defineConfig(({ mode }) => ({
    plugins  : [
        react(),
        VitePluginBundleMonitoring({
            compareFileDir: path.resolve(__dirname, 'compare'),
        }),
    ],
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
        __IS_DEV__: JSON.stringify(mode === 'development'),
        __API__   : JSON.stringify(
            mode === 'development'
            ? 'http://192.168.0.123:3000/api'
            : 'https://product-backend-hxe8.onrender.com/api',
        ),
    },
    publicDir: 'public',
    build    : {
        outDir   : 'dist',
        assetsDir: 'assets',
    },
}));
