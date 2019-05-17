var path = require('path');
var glob = require("glob");
var autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        dependencies: './src/js/dependencies.js',
        app: './src/js/app/app.js',
        components: glob.sync("./src/js/app/*/*.js")
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [{
            test: /\.(sass|scss)$/,
            use: ExtractTextPlugin.extract({
                use: [{
                    loader: "css-loader",
                    options: {
                        url: false
                    }
                }, {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            autoprefixer({
                                browsers: ['ie >= 8', 'last 4 version']
                            })
                        ],
                        sourceMap: true
                    }
                }, {
                    loader: "sass-loader"
                }]
            })
        },
        {
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: { presets: ['@babel/preset-env'] }
            }]
        }]
    },
    plugins: [
        new ExtractTextPlugin('css/style.css'),
        new OptimizeCssnanoPlugin({
            cssnanoOptions: {
                preset: ['default', {
                    discardComments: {
                        removeAll: true
                    }
                }]
            }
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        }),
        new copyWebpackPlugin([{
            from: './src/js/app/*/*.html',
            to: './views/[name].html'
        },{
            from: './src/img',
            to: './img'
        },{
            from: './src/fonts',
            to: './fonts'
        },{
            from: './src/sass/angular-material.css',
            to: './css/angular-material.css'
        }])
    ],
    devServer: {
        host: '127.0.0.1',
        port: 8080,
        open: true
    }
}