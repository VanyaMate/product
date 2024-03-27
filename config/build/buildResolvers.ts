import { ResolveOptions } from 'webpack';


export const buildResolvers = function (): ResolveOptions {
    return {
        extensions: [ '.tsx', '.ts', '.js' ],
    };
};