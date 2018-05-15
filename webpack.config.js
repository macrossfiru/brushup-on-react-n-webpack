/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const bundleExtractPlugin = new ExtractTextPlugin({
    filename: 'css/bundle.css',
});

const vendorsExtractPlugin = new ExtractTextPlugin({
    filename: 'css/vendors.css',
});

module.exports = (env) => {
    return {
        name: 'client',
        target: 'web',
        // entry: ['./src/js/index.js', './src/scss/styles.scss'],
        entry: ['./src/js/index.js'],
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'js/bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: [/node_modules/],
                    loader: 'babel-loader',
                    options: {
                        plugins: ['transform-runtime'],
                        presets: ['env', 'react'], // arg-2 'stage-0' omitted
                    },
                },
                {
                    test: /\.scss$/,
                    exclude: [/node_modules/],
                    use: bundleExtractPlugin.extract({
                        use: [
                            { loader: 'css-loader' },
                            { loader: 'sass-loader'}
                        ]
                    }),
                },
                {
                    test: /\.css$/,
                    exclude: [/node_modules/],
                    use: vendorsExtractPlugin.extract({
                        use: [
                            { loader: 'css-loader' } ],
                    }),
                },
            ],
        },
        resolve: { extensions: ["*", ".js", ".jsx"] },
        stats: {
            colors: true,
        },
        devtool: 'source-map',
        plugins: [
            new webpack.DefinePlugin({
                SOCKET_URL: JSON.stringify(process.env.SOCKET_URL ? process.env.SOCKET_URL : 'wss://localhost:3000'),
            }),
            bundleExtractPlugin,
            vendorsExtractPlugin,
        ],
    };
};
