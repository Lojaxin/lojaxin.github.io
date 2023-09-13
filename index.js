const path = require('path');
const fs = require('fs');
const Builder = require('./builder');
const { copyFolderSync } = require('./utils');

class Hander {
    constructor(opts) {
        this.entry = opts.entry;
        this.menus = [];
        this.bundleName = "dist"
    }

    build() {
        const root = path.resolve(__dirname, this.entry);
        const rendRoot = fs.readdirSync(root);
        rendRoot.forEach(dirName => {
            this.menus.push({
                name: dirName,
                staticPath: path.join(root, dirName),
                childFiles: fs.readdirSync(path.join(root, dirName))
            });
        })
        this.createBuildFiles();
    }

    createBuildFiles() {
        //创建一个产出文件夹
        const output = path.join(__dirname, this.bundleName);
        fs.mkdir(output, () => {
            //创建一个带有菜单的首页
            this.createMenuHtml(output);
            //复制到根文件
            copyFolderSync(path.join(__dirname, 'public/images'), path.join(output, 'images'));
            copyFolderSync(path.join(__dirname, 'public/css'), path.join(output, 'css'));
            copyFolderSync(path.join(__dirname, 'public/js'), path.join(output, 'js'));
            this.menus.forEach(dir => {
                (new Builder({
                    inputPath: dir.staticPath,
                    outputName: path.join(this.bundleName, path.basename(dir.name))
                })).build()
            })
        })
    }

    createMenuHtml(output) {
        const menuHtml = this.menus.map(menu => `
            <li class="submenu">
                <a href="#">${menu.name}</a>
                <ul>
                    ${menu.childFiles.map(child => `<li><a href="/${menu.name}/${path.basename(child, '.md')}.html">${path.basename(child, '.md')}</a></li>`)}
                </ul>
            </li>
        `);
        let htmlContent = fs.readFileSync(path.join(__dirname, 'public/index.html'), 'utf-8');
        htmlContent = htmlContent.replace('<!-- renderMenus -->', menuHtml.toString().replace(',', ''))
        fs.writeFile(path.join(output, 'index.html'), htmlContent, () => { })
    }
}

const hander = new Hander({
    entry: 'notes'
})

hander.build();


// const builder = new Builder({
//     inputPath: path.resolve(__dirname,'public/docs')
// })

// builder.build();