const Koa = require("koa")
const bodyparser = require("koa-bodyparser")
const static = require("koa-static")
const query = require('./middleware/query'); //引入封装的中间件
const router = require("./router/index") //实现路由分发
const path = require("path")

let app = new Koa()
app.use(static(path.join(process.cwd(), "public"))) //静态资源
app.use(bodyparser()) //获取post参数
app.use(query()); //使用自己封装的query中间件
app.use(router.routes(), router.allowedMethods()) //使用路由中间件

app.listen(3000)