const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // чистит папку dist
const CopyWebpackPlugin = require('copy-webpack-plugin') // скопировать спрайты
//const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin')

module.exports = {
    context: path.resolve(__dirname, '../src'),
    mode: 'production',
    entry: {
        main: path.resolve(__dirname, '../prod/index.js')
    },
    devtool: false,
    performance: {
        hints: false,
        maxEntrypointSize: 900000,
        maxAssetSize: 900000
    },
    output: {
        filename: '[name].[contenthash].js', // название чанка - main 
        path: path.resolve(__dirname, '../dist') // так корректнее
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../prod/index.html'),
            minify: {
                collapseWhitespace: true // постоянно оптимизирован, если true
            }
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.resolve(__dirname, '../dist/**/*')]
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, '../src/assets/sprites'),
                to: path.resolve(__dirname, '../dist/src/assets/sprites'),
                globOptions: {
                    ignore: ['*.DS_Store'],
                },
                noErrorOnMissing: true,
            }]
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../src/assets/fonts"),
                    to: path.resolve(__dirname, "../dist/src/assets/fonts"),
                    globOptions: {
                        ignore: ["*.DS_Store"],
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../src/assets/styles"),
                    to: path.resolve(__dirname, "../dist/src/assets/styles"),
                    globOptions: {
                        ignore: ["*.DS_Store", "**/scss-styles"],
                    },
                    noErrorOnMissing: true,
                },
            ],
        }),
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.(png|jpeg|svg|gif)$/,
            use: ['file-loader']
        },
        {
            test: /\.(ttf|woff|woff2|eot)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'src/assets/fonts',
            }
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }
        ]
    }
}