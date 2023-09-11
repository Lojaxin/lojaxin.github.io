# babel-preset-xin
>   将eslint的一些常用配置都装进一个包，避免每次搭建项目需要逐个引入

**下面是整合到这里面的包**

*   @babel/eslint-parser
*   @typescript-eslint/parser
*   @typescript-eslint/eslint-plugin
*   eslint-plugin-react
*   eslint-plugin-react-hooks
*   eslint-plugin-lodash
*   typescript

上面的这些包可以不用再另外安装到项目中，但是eslint和eslint-webpack-plugin插件必须要安装到项目。

#### 1.如何使用?
npm install eslint eslint-webpack-plugin eslint-config-xin -D

-   webpack5.0
    在webpack.config.js的插件中集成eslint
```
//在webpack中集成eslint
new EslintWebpackPlugin({
    eslintPath: 'eslint',
    extensions: ['js', 'ts', 'jsx', 'tsx'],
    exclude: ['node_modules', 'dist', 'true'],
    fix: true, //是否自动修复
    formatter: 'stylish'
}),
```
