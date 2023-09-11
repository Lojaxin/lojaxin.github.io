
const path = require('path');
const webpack = require('webpack');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const WebpackBar = require('webpackbar');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    plugins: [
        new WebpackBar({
            // color: "#85d", // 默认green，进度条颜色支持HEX
            basic: false, // 默认true，启用一个简单的日志报告器
        }),
        //文件热更新的信息 hot:true就够了
        // new webpack.HotModuleReplacementPlugin(),

        // 引用dll
        new webpack.DllReferencePlugin({
            context: path.resolve(__dirname, '../dist'),
            manifest: require('../dist/manifest.json'),
            sourceType: 'commonjs2',
        }),
        //在webpack中集成eslint
        new EslintWebpackPlugin({
            eslintPath: 'eslint',
            extensions: ['js', 'ts', 'jsx', 'tsx'],
            exclude: ['node_modules', 'dist', 'true'],
            fix: true, //是否自动修复
            formatter: 'stylish'
        }),
        // 在html中引入dll
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, '../dist', 'vendor.js'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s?css$/,
                exclude: /node_moduels/,
                include: path.resolve(__dirname, '../src'),
                //loader的执行顺序是从右到左,从下到上
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
        ]
    },
    //webpack-dev-server起的服务,会读取内存中的文件
    devServer: {
        host: '127.0.0.1',
        port: '3000',
        //自动打开浏览器
        open: true,
        //热更新
        hot: true,
        //启用gzip压缩
        compress: true,
        //代理
        // proxy: {s
        //     '/api': {
        //         target: 'http://127.0.0.1:8088',
        //         pathRewrite: { '^/api': '' },
        //         changeOrigin: true
        //     },
        // },
    }
};