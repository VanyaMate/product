import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import VitePluginBundleMonitoring from 'vite-plugin-bundle-monitoring';


export default defineConfig(({ mode }) => {
    const isDev: boolean = mode === 'development';

    return {
        plugins  : [
            react(),
            VitePluginBundleMonitoring({
                compareFileDir: path.resolve(__dirname, 'compare'),
            }),
        ],
        css      : {
            modules: {
                generateScopedName: isDev ? '[name]_[local]_[hash:base64:5]'
                                          : '[hash:base64:5]',
            },
        },
        resolve  : {
            alias: {
                '@': '/src',
                '$': '/',
            },
        },
        define   : {
            __IS_DEV__: JSON.stringify(isDev),
            __API__   : JSON.stringify(
                isDev
                ? 'http://192.168.0.123:3000/api'
                : 'https://product-backend-hxe8.onrender.com/api',
            ),
            __STATIC__: JSON.stringify(
                isDev
                ? 'http://localhost:3000'
                : 'https://product-backend-hxe8.onrender.com',
            ),
        },
        publicDir: 'public',
        build    : {
            outDir   : 'dist',
            assetsDir: 'assets',
        },
    };
});
