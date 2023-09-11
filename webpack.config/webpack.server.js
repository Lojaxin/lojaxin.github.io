
//MiniCssExtractPlugin更小的css优化插
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //打包分析

module.exports = {
    mode: 'production',
    devtool: 'cheap-module-source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css'
        }),
        // new BundleAnalyzerPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(s)?css$/,
                include: path.resolve(__dirname, '../src'),
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    }
};
