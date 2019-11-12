const Koa = require("koa")
const bodyparser = require("koa-bodyparser")
const router = require("koa-router")()
const query = require("./db/query")

let app = new Koa();
app.use(bodyparser())

// app.use(async(ctx, next) => {
//     console.log("ctx第一个中间")

//     await next()
// })

app.use(router.routes());

app.use(router.allowedMethods());

// router.post('/api/login', ctx => {
//     console.log("/api/login", ctx.request.body);
//     ctx.body = ctx.request.body
// })

router.get('/api/userlist', async(ctx, next) => {
    let data = await query('select * from userlist')


    ctx.body = data
})


app.listen(process.env.PORT || 3000, () => {
    console.log("服务启动成功")
})