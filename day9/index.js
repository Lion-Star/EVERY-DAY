const Koa = require("koa")

let app = new Koa()

app.use(async(ctx, next) => {
    console.log(1);
    await next()
    console.log(1);
    await ctx.body
})

app.use(async(ctx, next) => {
    console.log(2);
    await next()
    console.log(2);

})

app.use(async(ctx, next) => {
    console.log(3);
    await next()
    console.log(3);

})

app.listen(3000)