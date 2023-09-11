const http = require('http');
const fs = require('fs');
const path = require('path');
const mime = require('mime');

/** 在本地运行打包后的文件 */
const server = http.createServer((req, res) => {
    //不含.就是路由
    if (!req.url.includes('.')) {
        //dist文件夹是否存在
        const distStatus = fs.existsSync(path.resolve(__dirname, './dist'));
        if (!distStatus) {
            throw new Error('请先运行打包命令:npm run build');
        }
        const filePath = path.resolve(__dirname, './dist/index.html');
        fs.readFile(filePath, (err, data) => {
            if (err) { console.log(err); }
            res.setHeader('Content-Type', 'text/html;charset=utf-8');
            res.end(data);
        });
    } else {
        if (req.url.includes('ico')) {
            return res.end();
        }
        const queryPath = req.url.includes('?') ? req.url.split('?')[0] : req.url;
        const filePath = path.join(__dirname, './dist', queryPath);
        //返回文件,需要给浏览器提供内容类型,内容的编码格式
        res.setHeader('Content-Type', `${mime.getType(filePath)};charset=utf-8`);
        fs.createReadStream(filePath).pipe(res);
    }
});

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});