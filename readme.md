#### 1.背景
>   个人比较喜欢用md来写文档,想着将之前记录下来的一些文档作为静态站点发布到github上面;如果直接将 Md 上传到github上面是可以访问的,但是也有几点不好,一个是样式无法自己控制,二是没有菜单,三是githun的静态站点的所有请求都会被拦截,所以会出现图片打不开的情况;于是就搜了一下市面上比较好的静态站点发布工具;但是结果不是很理想,国内普遍使用率比较高的是 HEXO 的工具;网上安装使用的文档一大堆,内容太杂也懒得看,大致翻了一下也是通过将项目打包后来发布;不过对我而言是不太符合预期的,主要原因是:我仅仅需要将md放到github上面,然后给我一个菜单即可;干嘛还要我去学习别人的框架,前端各种框架和api已经够多了,实在没有必要为了这么个小事情去浪费精力;于是,我打算自己打包,然后通过github的actions自己部署.用惯了别人造的轮子,也是时候让自己给自己打造下轮子;

#### 2.需求拆分
>   我们的核心需求就是将一个文件夹内所有的md文件打包成html,这样就能自己控制样式,而且还能将图片一起打包上去;这样来看,就产生下面的几个需求
-   1.将md打包成html,核心的第三方包:`markdown-it`;
-   2.遍历资源目录,产出一个打包后的文件包;
    -   1>.需要产出一个首页文件;
    -   2>.需要将文件和菜单建立关联;
-   3.配置 workflows 自己部署;(不重要)

#### 3.进入开发
-   1.先创建一个对象,把资源目录和产出目录给他;
```
const Builder = require('./Builder');
const builder = new Builder({
    entry:'notes',
    ouput:'dist'
});
builder.start();

```
-   2.找到资源目录,读取这个资源目录下的文件,这就又产生了两个问题;
    -   1.目录下有不可能都是文件吧,不然咋分类,这就需要去递归文件夹,统计信息;
    -   2.文件操作是直接用`fs`还是`fs.promise`? 同步操作都是回调,会形成">"代码,官方都出异步了,肯定是优先异步;
```
async depthDir(root, parentPath = this.entry) {
    let index = 0;
    let result = [];
    while (index < root.length) {
        const dirName = root[index];
        const dirPath = path.join(__dirname, parentPath, dirName);
        const stat = await fs.stat(dirPath);
        const parentName = parentPath.replace(this.entry, '');
        if (stat.isDirectory()) {
            const childFiles = await fs.readdir(dirPath);
            const childDir = await this.depthDir(childFiles, path.join(parentPath, dirName));
            result.push({
                name: dirName,
                parentName,
                parentPath: path.dirname(dirPath),
                childFiles: childDir
            })
        } else {
            result.push({
                name: dirName,
                parentName,
                parentPath: path.dirname(dirPath)
            })
        }
        index++;
    }
    return result;
}

```
-   3.创建首页文件,递归资源信息作为菜单,字符串拼接操作;

```
iterator(menus = this.menus, doFn) {
    for (const menu of menus) {
        if (menu.childFiles?.length) {
            this.iterator.call(this, menu.childFiles, doFn);
        } else {
            //dosomething
            doFn(menu)
        }
    }
}

    this.menusNodeStr = '<ul>';
    const joinMenus = (menu) => {
        const isDir = menu.childFiles?.length > 0;
        const fileExt = path.extname(menu.name);
        const filePreFix = path.basename(menu.name, fileExt);
        const parentName = `${menu.parentName}/${filePreFix}`;
        this.menusNodeStr += `
        <li class="submenu">
            <a href=${isDir ? 'javacript:void(0);' : `${parentName}.html`}>
                ${filePreFix}
            </a>
            ${isDir ? this.iterator(menu.childFiles) : ''}
        </li>
        `
    }
    this.iterator(this.menus, joinMenus);
    this.menusNodeStr += '</ul>';
```
-   4.继续遍历之前的生成的菜单信息,创建多个异步打包任务
```
build() {
    let promises = [];
    const pushPromise = (menu) => {
        promises.push(this.bundle(menu))
    }
    this.iterator(this.menus, pushPromise);
    return Promise.all(promises)
}
```
-   5.copy静态文件目录,因为css,js,images都放在这里;

```
 copyFolderSync(path.resolve(__dirname, 'public'), path.join(this.outputPath, 'public'));

```

-   6.将build后的产出文件发布到github;