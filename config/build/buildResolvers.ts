import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';


export const buildResolvers = function (options: BuildOptions): ResolveOptions {
    return {
        extensions    : [ '.tsx', '.ts', '.js' ],
        preferAbsolute: true,
        modules       : [
            options.paths.src, 'node_modules',
        ],
        mainFiles     : [ 'index' ],
        alias         : {
            '@': options.paths.src,
        },
    };
};