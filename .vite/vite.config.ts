import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import * as path from 'path';
import VitePluginBundleMonitoring from 'vite-plugin-bundle-monitoring';
import { VitePWA } from 'vite-plugin-pwa';


export default defineConfig(({ mode }) => {
    const isDev: boolean = mode === 'development';

    return {
        plugins  : [
            react(),
            VitePWA({
                registerType  : 'autoUpdate',
                injectRegister: 'inline',
                workbox       : {
                    runtimeCaching: [
                        {
                            urlPattern: ({ request }) => (request.destination === 'script') || (request.destination === 'style'),
                            handler   : 'StaleWhileRevalidate',
                            options   : {
                                cacheName : 'liberty-script-style-cache',
                                expiration: {
                                    maxEntries   : 100,
                                    maxAgeSeconds: 60 * 60 * 24 * 30, // 30d
                                },
                            },
                        },
                    ],
                },
            }),
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
                ? 'http://localhost:3000/api'
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
            outDir       : 'dist',
            assetsDir    : 'assets',
            minify       : 'terser',
            rollupOptions: {
                output: {
                    generatedCode: 'es2015',
                },
            },
            cssMinify    : 'lightningcss',
        },
    };
});
