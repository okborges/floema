const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const IS_DEVELOPMENT = process.env.NODE_ENV === 'dev';

const dirApp = path.join(__dirname, 'app');
const dirShared = path.join(__dirname, 'shared');
const dirStyles = path.join(__dirname, 'styles');
const dirNode = 'node_modules';

module.exports = {
    entry: [path.join(dirApp, 'index.js'), path.join(dirStyles, 'index.scss')],

    resolve: {
        modules: [dirApp, dirShared, dirStyles, dirNode]
    },

    plugins: [
        new webpack.DefinePlugin({
            IS_DEVELOPMENT
        }),

        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './shared',
                    to: ''
                }
            ]
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),

        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                    plugins: [
                        // interlaced: Interlace gif for progressive rendering.
                        ['gifsicle', { interlaced: true }],

                        // progressive: Lossless conversion to progressive.
                        ['jpegtran', { progressive: true }],

                        // optimizationLevel (0-7): The optimization level 0 enables a set of
                        // optimization operations that require minimal effort. There will be
                        // no changes to image attributes like bit depth or color type, and no
                        // recompression of existing IDAT datastreams. The optimization level
                        // 1 enables a single IDAT compression trial. The trial chosen is what
                        // OptiPNG thinks it’s probably the most effective.
                        ['optipng', { optimizationLevel: 7 }]
                    ]
                }
            }
        })
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader'
                }
            },

            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: ''
                        }
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },

            {
                test: /\.(jpe?g|png|gif|svg|woff2?|fnt|webp)$/i,
                loader: 'file-loader',
                options: {
                    name(file) {
                        return '[hash].[ext]';
                    }
                }
            }
        ]
    }
};
