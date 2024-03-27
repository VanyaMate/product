import { RuleSetRule } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';


export const buildLoaders = function (options: BuildOptions): RuleSetRule[] {
    const typescriptLoader: RuleSetRule = {
        test   : /\.tsx?$/,
        use    : 'ts-loader',
        exclude: /node_modules/,
    };

    const scssLoaders: RuleSetRule = {
        test: /\.s[ac]ss$/i,
        use : [
            options.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader : 'css-loader',
                options: {
                    modules: {
                        auto          : (resPath: string): boolean => {
                            return resPath.includes('.modules.');
                        },
                        localIdentName: options.isDev
                                        ? '[path][name]__[local]--[hash:base64:5]'
                                        : '[hash:base64:5]',
                    },
                },
            },
            'sass-loader',
        ],
    };

    return [
        typescriptLoader,
        scssLoaders,
    ];
};