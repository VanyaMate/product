import { WebpackPluginInstance, ProgressPlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import { BuildOptions, BuildPaths } from './types/config';


export const buildPlugins = function ({ paths }: BuildOptions): WebpackPluginInstance[] {
    return [
        new ProgressPlugin(),
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
    ];
};