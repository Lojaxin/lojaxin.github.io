const path = require('path');
const fs = require('fs').promises;
const { copyFolderSync } = require('./utils');
const { existsSync } = require('fs');
const hljs = require('highlight.js');

const markdownIt = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return '<pre class="hljs"><code>' +
                    hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
                    '</code></pre>';
            } catch (__) { }
        }

        return '<pre class="hljs"><code>' + markdownIt.utils.escapeHtml(str) + '</code></pre>';
    }
});

class Builder {
    constructor(opts) {
        this.entry = opts.entry;
        this.bundleName = opts.output || "dist";
        this.menus = [];
        this.menusNodeStr = "";
        this.outputPath = ""
    }

    async run() {
        const rootPath = path.resolve(__dirname, this.entry);
        const root = await fs.readdir(rootPath);
        //获取所有的文件信息
        this.menus = await this.depthDir(root);
        console.dir(this.menus, { depth: 100 })
        //创建一个bundle的文件夹 
        this.outputPath = path.resolve(__dirname, this.bundleName);
        try {
            await fs.mkdir(this.outputPath);
        } catch (error) { }

        await this.createMenuHtml();

        //将所有md文件打包成html文件
        const res = await this.build();
        if (!res.some(item => !item)) {
            console.log('所有md文件打包成功');
        }
        //复制到bundle的文件夹
        copyFolderSync(path.resolve(__dirname, 'public'), path.join(this.outputPath, 'public'));
        console.log('public文件夹复制成功,所有流程结束');
    }

    //深度遍历 
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
                //
                if (childFiles.length) {
                    const childDir = await this.depthDir(childFiles, path.join(parentPath, dirName));
                    result.push({
                        name: dirName,
                        parentName,
                        parentPath: path.dirname(dirPath),
                        childFiles: childDir
                    })
                }
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

    async createMenuHtml() {
        const recursion = (menus) => {
            let str = '';
            for (const menu of menus) {
                const isDir = menu.childFiles?.length;
                const fileExt = path.extname(menu.name);
                const filePreFix = path.basename(menu.name, fileExt);
                const parentName = `${menu.parentName}/${filePreFix}`;
                str += `
                <li class="submenu">
                    <a href=${isDir ? 'javacript:void(0);' : `${parentName}.html`}>
                        ${filePreFix}
                    </a>
                    ${isDir ? `<ul>${recursion(menu.childFiles)}</ul>` : ''}
                </li>
                `
            }
            return str;
        }
        this.menusNodeStr = `<ul>${recursion(this.menus)}</ul>`;
        const htmlContent = await this.transRenderContent('<h1 class=homeTitle>Welcome!</h1>');
        await fs.writeFile(path.join(this.outputPath, 'index.html'), htmlContent);

        console.log('index.html创建成功');
    }

    //迭代器
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

    //替换html内容
    async transRenderContent(renderContent, renderTitle) {
        let htmlContent = await fs.readFile(path.resolve(__dirname, 'public/index.html'), 'utf-8');
        htmlContent = htmlContent.replaceAll('<!-- renderTitle -->', renderTitle || '');
        htmlContent = htmlContent.replace('<!-- renderMenus -->', this.menusNodeStr)
        htmlContent = htmlContent.replace('<!-- renderContent -->', renderContent);
        return htmlContent;
    }

    //深度遍历,将md文件打包成html
    build() {
        let promises = [];
        const pushPromise = (menu) => {
            promises.push(this.bundle(menu))
        }
        this.iterator(this.menus, pushPromise);
        return Promise.all(promises)
    }

    async bundle(menu) {
        const { name, parentPath } = menu;
        const fileExt = path.extname(name);
        if (fileExt && fileExt !== '.md') {
            throw new Error('目前只能处理.md文件');
        }
        const filePath = path.join(parentPath, name);
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) {
            return fs.mkdir(path.join(parentPath.replace(this.entry, this.bundleName), name), { recursive: true })
        }
        const filePrefix = path.basename(filePath, fileExt);
        const markdownContent = await fs.readFile(filePath, 'utf-8');
        // 将Markdown内容转换为HTML
        const content = markdownIt.render(markdownContent);
        const htmlContent = await this.transRenderContent(content, filePrefix);

        let writePath = parentPath.replace(this.entry, this.bundleName);

        if (!existsSync(writePath)) {
            await fs.mkdir(writePath, { recursive: true })
        }
        // 写入HTML文件
        const fileName = `${filePrefix}.html`;
        await fs.writeFile(path.join(writePath, fileName), htmlContent, 'utf-8');
        return `${path.join(writePath, fileName)}`
    }
}

module.exports = Builder;