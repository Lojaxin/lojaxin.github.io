const Koa = require('koa');
const Router = require('koa-router');
const nextjs = require('next');
const fs = require('fs').promises;
const path = require('path');


const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = nextjs({ dev });
const nextjsHandler = app.getRequestHandler();


const readMds = async (ctx, next) => {
    const filesPath = path.join(__dirname, 'public', 'docs');
    const fileObj = await fs.stat(filesPath);
    if (fileObj.isDirectory()) {
        const files = await fs.readdir(filesPath);
        ctx.req.mdList = files.filter(item => item.includes('.md'));
    }
    await next();
}

app.prepare().then(() => {
    const server = new Koa();
    const router = new Router();

    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200
        await next()
    })

    server.use(readMds);

    //其他的交由nextjs处理
    server.use(router.routes());

    server.use(async (ctx, next) => {
        await nextjsHandler(ctx.req, ctx.res);
        ctx.respond = false;
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})
