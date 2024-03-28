import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';
import path from 'path';


export default (env: BuildEnv) => {
    const paths: BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html : path.resolve(__dirname, 'public', 'index.html'),
        src  : path.resolve(__dirname, 'src'),
    };

    const { mode = 'development', port = 3000 } = env;
    const isDev: boolean                        = mode === 'development';

    return buildWebpackConfig({ mode, paths, isDev, port });
};