import { RuleSetRule } from 'webpack';


export const buildLoaders = function (): RuleSetRule[] {
    const typescriptLoader: RuleSetRule = {
        test   : /\.tsx?$/,
        use    : 'ts-loader',
        exclude: /node_modules/,
    };

    const scssLoaders: RuleSetRule = {
        test: /\.s[ac]ss$/i,
        use : [
            'style-loader',
            'css-loader',
            'sass-loader',
        ],
    };

    return [
        typescriptLoader,
        scssLoaders,
    ];
};