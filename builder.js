const path = require('path');
const fs = require('fs').promises;

const markdownIt = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
});


class Builder {
    constructor(opts) {
        this.outputPath = opts.outputPath;
        this.inputPath = opts.inputPath;
        this.mdList = [];
    }

    async build() {
        const mdFiles = path.resolve(__dirname, this.inputPath);
        const mdList = await fs.readdir(mdFiles);
        this.mdList = mdList.map(file => path.join(mdFiles, file));
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
        if (end) { console.log('build success!') }
    }

    async renderMdToHtml(file, next) {
        const dist = path.join(__dirname, 'dist');
        try {
            await fs.stat(dist)
        } catch (error) {
            await fs.mkdir(dist);
        }
        const markdownContent = await fs.readFile(file, 'utf-8');
        // 将Markdown内容转换为HTML
        const htmlContent = markdownIt.render(markdownContent);
        // 写入HTML文件
        const fileExt = path.extname(file);
        const fileName = `${path.basename(file, fileExt)}.html`;
        await fs.writeFile(path.join(dist, fileName), htmlContent, 'utf-8');
        return next()
    }
}

module.exports = Builder;