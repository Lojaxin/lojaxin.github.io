const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//打包多个html文件,需要注意devServer默认读取的是内存中的index.html,如果这里是main.html,则需要手动输入xxx/main.html;
const htmlPlugins = ['index'].map(name => new HtmlWebpackPlugin({
    //模版的路径
    template: path.resolve(__dirname, '../public/index.html'),
    //打包后文件的名称
    filename: `${name}.html`,
    //压缩
    minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true
    },
    //给脚本添加哈希值
    hash: true,
}));

module.exports = {
    /** 入口文件 */
    entry: {
        // vendorChunk: ['react', 'react-dom', 'react-router-dom'],
        // app: {
        //     import: path.resolve(__dirname, '../', 'src/index.tsx'),
        //     dependOn: 'vendorChunk'
        // }
        app: path.resolve(__dirname, '../', 'src/index.tsx'),
    },
    /** 打包后的文件 */
    output: {
        publicPath: '/',
        filename: '[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist'),
        // clean: true //打包后删除之前的文件
    },
    /** 项目优化项 */
    optimization: {
        minimize: false,
        //
        // splitChunks: {
        //     chunks: 'all'
        // }
    },
    /** 实验功能 */
    experiments: {
        // 启用 ES 模块支持,tree shaking只支持es6模块
        outputModule: true,
    },
    /**loader加载器,代码转译 */
    module: {
        rules: [
            //webpack5内置了asset模块,可以处理图片,字体,音视频等文件
            {
                test: /\.(jpe?g|png|svg|gif|webp)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[contenthash:8][ext]'
                }
            },
            {
                test: /\.(t|j)sx?$/,
                // exclude: ['node_moduels', 'dist'],
                include: path.resolve(__dirname, '../src'),
                //thread-loader将耗时的任务在独立的线程中并行处理，从而提高构建性能
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            //启用缓存
                            cacheDirectory: true
                        }
                    }
                ]
            }
        ]
    },
    /** 配置插件 */
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!vendor.*', '!manifest.*'] //不删除dll产生的文件
        }),
        //忽略moment的本地化内容
        new webpack.IgnorePlugin({
            resourceRegExp: /^\.\/locale$/,
            contextRegExp: /moment$/
        }),
        ...htmlPlugins
    ],

    resolve: {
        // 路径别名
        alias: {
            Src: path.resolve(__dirname, '../', 'src'),
            loadsh: 'lodash-es'
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'], //按照顺序解析后缀名,不建议加.css
        modules: [path.resolve(__dirname, '../', 'node_modules')], //指定第三方模块的绝对路径,减少搜索步骤
        mainFields: ['main', 'module'], //按照顺序解析包的入口文件,一般默认是main
    },
    devServer: {
        client: {
            overlay: {
                errors: true, //如果有错误需要阻断运行
                warnings: false, //eslint警告不用阻断代码流程
            }
        },
    }
};