## 一.安装必要的依赖
```
yarn add express react react-dom react-router-dom -S
yarn add webpack webpack-cli webpack-merge babel-loader babel-preset-xin @babel/node @babel/cli -D
``` 

## 二.文件夹说明
```
|- public   //静态文件目录
|- config   //webpack的配置文件
    |-- webpack.base.babel.js', //公共配置文件
    |-- webpack.client.babel.js', //入口为client-render,打包客户端代码
    |-- webpack.server.babel.js'   //入口为index.js,打包整个服务
|- src      //工作目录
    |-- App.jsx',   //根组件
    |-- pages,     //页面组件
       |   |-- Home.jsx',
       |   |-- index.module.scss',
    |-- ssr,
        |-- client-render.js', //客户端渲染代码
        |-- render-middleware.js',//处理路由中间件
        |-- server-render.js', //服务端渲染代码
    |-- routes,
        |-- index.js' //路由组件
|- index.js //node服务文件
|- babel.config.js  babel的配置文件
```

## 三.开发
-   1.创建服务
```index.js
import express from 'express';
import render from './src/ssr/render-middleware';

const server = express();
server.use(express.static('public'));
server.get('*', render());

server.listen(3000, () => {
    console.log('server is running at http://localhost:3000');
});
```
-   2.编写路由中间件
```render-middleware.js

```
-   3.commonjs 不支持ES6的语法,还需要index.js的代码也需要使用babel转译;
```
touch webpack.node.babel.js

import path from 'path';
import { merge } from 'webpack-merge';
import defaultConfig from './webpack.base.babel';
import nodeExternals from 'webpack-node-externals';

const _config = {
    target: 'node',
    entry: {
        main: path.resolve(__dirname, '../index.js'),//main就是chunks.id
    },
    output: {
        path: path.resolve(__dirname, '../public/dist/server'),
        filename: 'main.js',
    },
    //不用打包的模块
    externals: ['@loadable/component', nodeExternals()],
}

export default function (config) {
    return merge(defaultConfig, _config);
};
```