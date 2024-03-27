import { Configuration } from 'webpack';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildMode, BuildPaths } from './config/build/types/config';
import path from 'path';


const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    html : path.resolve(__dirname, 'public', 'index.html'),
    build: path.resolve(__dirname, 'build'),
};


const mode: BuildMode = 'development';
const isDev: boolean  = mode === 'development';

const config: Configuration = buildWebpackConfig({ mode, paths, isDev });

export default config;