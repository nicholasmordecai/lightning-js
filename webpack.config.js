const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const TARGET = process.env.npm_lifecycle_event;
const CopyWebpackPlugin = require('copy-webpack-plugin');

const common = {
    cache:false,
    context: __dirname + '/dist',
    entry: [
        './src/libs/pixi.js',
        './src/libs/Box2d.js',
        './src/libs/howler.js',
        './src/libs/stats.min.js',
        './build/compile.js'
    ],
    output: {
        path: './dist',
        filename: 'lightning.js',
        library: 'Lightning',
        libraryTarget: 'var'
    },
    devtool: 'source-map',
resolve: {
        extensions: ['', '.webpack.js', '.js'],
        root: path.join(__dirname, "src"),
        moduleDirectories: [
            "node_modules"
        ]
    },
    node: {
        fs: "empty"
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'ts-loader'
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json-loader'
            }
        ],
        noParse: [/.pixi.js$/]
    }
};

if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {
        context: path.join(__dirname, ''),
        devServer: {
            contentBase: './dist/',
            historyApiFallback: true,
            hot: true,
            inline: true,
            progress: true,
            stats: 'errors-only',
            host: process.env.HOST,
            port: process.env.PORT || 5601
        },
        cache: true,
        devtool: 'cheap-module-source-map',
        plugins: [
            //new webpack.optimize.UglifyJsPlugin({minimize: true}),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                'NODE_ENV': JSON.stringify('production')
                }
            })
        ]
    });
}

if(TARGET === 'build') {
    module.exports = merge(common, {
        context: path.join(__dirname, ''),
        plugins: [

        ]
    });
}