import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';
import path from 'path';


export default (env: BuildEnv) => {
    const { mode = 'development', port = 3000 } = env;
    const paths: BuildPaths                     = {
        entry: path.resolve(__dirname, 'src', 'index.ts'),
        html : path.resolve(__dirname, 'public', 'index.html'),
        build: path.resolve(__dirname, 'build'),
    };
    const isDev: boolean                        = mode === 'development';

    return buildWebpackConfig({ mode, paths, isDev, port });
};