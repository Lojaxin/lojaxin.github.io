const Koa = require('koa');
const Router = require('koa-router');
const nextjs = require('next');


const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = nextjs({ dev });
const nextjsHandler = app.getRequestHandler();


const userList = [{
    _id: '64e712d8f84c945b1096aefb',
    userName: 'zs',
    age: 18,
    pwd: '123456'
}, {
    _id: '22222',
    userName: 2,
    name: 'ls',
    age: 18,
    pwd: '123456'
}];

app.prepare().then(() => {
    const server = new Koa();
    const router = new Router();

    server.use(async (ctx, next) => {
        ctx.res.statusCode = 200
        await next()
    })

    router.get('/api/users/queryById', (ctx, next) => {
        const { id = '1' } = ctx.query || {};
        ctx.set('Content-Type', 'application/json;charset=utf-8');
        ctx.res.statusCode = 200;
        ctx.body = JSON.stringify(userList.find(item => item.id == id));
        return;
    })

    router.get('/api/users/queryAll', (ctx, next) => {
        ctx.set('Content-Type', 'application/json;charset=utf-8');
        ctx.res.statusCode = 200;
        ctx.body = JSON.stringify(userList);
        return;
    })

    //默认跳转到list,但是url还是/users
    router.get('/users', async ctx => {
        await app.render(ctx.req, ctx.res, '/users/list', ctx.query)
        ctx.respond = false;
    })

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
