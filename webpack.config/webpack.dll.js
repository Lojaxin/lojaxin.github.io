const webpack = require('webpack');
const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        // 依赖的库数组
        vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            'lodash',
            'antd',
            'axios'
        ],

    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js',
        library: '[name]_[fullhash]',
    },
    plugins: [
        new webpack.DllPlugin({
            // DllPlugin的name属性需要和output的libary保持一致
            name: '[name]_[fullhash]',
            path: path.resolve(__dirname, '../dist', 'manifest.json'),
        }),
    ]
};