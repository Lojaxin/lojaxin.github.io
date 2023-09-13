const path = require('path');
const fs = require('fs').promises;

const markdownIt = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
});


class Builder {
    constructor(opts) {
        this.inputPath = opts?.inputPath;
        this.outputName = opts?.outputName;;
        this.mdList = [];
    }

    async build() {
        const mdList = await fs.readdir(this.inputPath);
        this.mdList = mdList.map(file => path.join(this.inputPath, file));
        this.readFiles();
    }

    async readFiles() {
        let index = -1;
        const dispatch = (i = 0) => {
            //防止同一个中间件的next()被调用多次
            if (i <= index) throw new Error('next() called multiple times');
            index = i;
            //终止条件
            if (i === this.mdList.length) {
                return Promise.resolve(true);
            }
            return this.renderMdToHtml(this.mdList[i], () => dispatch(i + 1))
        }

        const end = await dispatch();
        if (end) { console.log(`${this.outputName} build success!`) }
    }

    async renderMdToHtml(file, next) {
        const output = path.join(__dirname, this.outputName);
        try {
            await fs.stat(output)
        } catch (error) {
            await fs.mkdir(output);
        }
        const markdownContent = await fs.readFile(file, 'utf-8');
        // 将Markdown内容转换为HTML
        const content = markdownIt.render(markdownContent);

        const fileExt = path.extname(file);
        const filePrefix = path.basename(file, fileExt);
        const fileName = `${filePrefix}.html`;
        // 写入HTML文件
        const indexHtml = path.join(__dirname, this.outputName.split('/').shift(), 'index.html');
        let htmlContent = await fs.readFile(indexHtml, 'utf-8');

        htmlContent = htmlContent.replace('<!-- rendercontent -->', content)
        htmlContent = htmlContent.replace('<title>笔记</title>', `<title>${filePrefix}</title>`)

        await fs.writeFile(path.join(output, fileName), htmlContent, 'utf-8');
        return next()
    }
}

module.exports = Builder;