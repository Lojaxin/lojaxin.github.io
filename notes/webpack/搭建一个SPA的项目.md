#   如何自定义实现一个类似于create-react-app的项目?

## 一.创建项目&安装依赖;
-   初始化
```
mkdir webpack-react-app && cd ./webpack-react-app
npm init 
```
-   安装 webpack
```
npm i webpack webpack-cli webpack-dev-server webpackbar webpack-merge html-webpack-plugin -D 
```
-   安装 babel
```
npm i babel-loader babel-preset-xin sass sass-loader style-loader css-loader -D 
```

-   安装 react
```
npm i react react-dom react-router-dom -S 
```

## 二.编写webpack配置 & babel配置
```
touch webpack.config.js && touch babel.confi.js
```
```javascript
//webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module exports = {
    mode:'development'
    entry:'./main.js',
    output:{
        filename: 'src/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist'),
    },
    module:{
        rules:[
             {
                test: /\.module\.s?css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]--[hash:base64:5]',
                            },
                        },
                    },
                    'sass-loader',
                ],
             },
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
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'),
            filename: `${name}.html`,
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true
            },
            //给脚本添加哈希值
            hash: true,
        })
    ],
    resolve: {
        alias: {
            Src: path.resolve(__dirname, '../src'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        host: '127.0.0.1',
        port: '3000',
        open: true,
        hot: true,
        compress: true,
        historyApiFallback: true,
        client: {
            overlay: {
                errors: true,
                warnings: false,
            }
        },
    }
}
```
```javascript
//babel.config.js
module.exports = {
    presets: ['babel-preset-xin']
};

```

## 三.创建入口文件 & 编写路由和组件
```
touch main.js && mkdir src;
```
```javascript
//main.js
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './routes';

const router = createBrowserRouter(routes);

const App = () => {
    return (
        <div>
            <img width={200} src={imgSrc} alt="" />
            <RouterProvider router={router} />
        </div>
    );
};
const root = createRoot(document.querySelector('#root'));
root.render(<App />);
```
```routes.js
import React from 'react';
//import Home from 'Src/pages/home';

const routes = [
    {
        path: '/',
        element: <h1>Hello</h1>
    },
    {
        path: '/login',
        element: <div>登录</div>,
    },
];

export default routes;
```

## 四.使用webpack-dev-server启动服务
```bash
    webpack server --env development --config webpack.config.js
```

## [项目地址](https://github.com/Lojaxin/webpack5-react)