import { BuildOptions } from './types/config';
import { Configuration } from 'webpack';
import path from 'path';
import { buildPlugins } from './buildPlugins';
import { buildLoaders } from './buildLoaders';
import { buildResolvers } from './buildResolvers';


export const buildWebpackConfig = function (options: BuildOptions): Configuration {
    const { mode, paths } = options;

    return {
        mode   : mode,
        entry  : paths.entry,
        output : {
            filename: '[name].[contenthash].js',
            path    : paths.build,
            clean   : true,
        },
        plugins: buildPlugins(options),
        module : {
            rules: buildLoaders(),
        },
        resolve: buildResolvers(),
    };
};