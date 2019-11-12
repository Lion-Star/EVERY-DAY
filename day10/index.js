const Koa = require("koa")
const bodyparser = require("koa-bodyparser")
const static = require("koa-static")
const query = require("./db/query")
const router = require("koa-router")()
const path = require("path")

let app = new Koa()
app.use(bodyparser())

app.use(router.routes())
app.use(router.allowedMethods())

app.use(static(path.join(process.cwd(), "public")))

//模糊搜索
router.get("/api/list", async(ctx, next) => {
    let { key } = ctx.query;
    let sql = ""
    if (!key) {
        sql = "select * from userlist"
    } else {
        sql = `select * from userlist where user like '%${key}%'`
    }

    try {
        let list = await query(sql)
        ctx.body = {
            code: 1,
            data: list
        }
    } catch (e) {
        ctx.body = {
            code: 0,
            data: e
        }
    }
})

//查
router.get("/api/search", async(ctx, next) => {
    let data = await query("select * from userlist")
    ctx.body = data
})

//增
router.post("/api/login", async(ctx, next) => {
    let { user, pwd, address, phone } = ctx.request.body;
    if (user && pwd) {
        let user1 = await query('select * from userlist where user=?', [user]);

        if (user1.length) {
            ctx.body = {
                code: 0,
                msg: '此人已存在'
            }
        } else {
            try {
                await query("insert into userlist (user, pwd, address, phone) values (?,?,?,?)", [user, pwd, address, phone])
                ctx.body = {
                    code: 1,
                    msg: "添加成功"
                }
            } catch (e) {
                ctx.body = {
                    code: 0,
                    msg: error
                }
            }
        }


    } else {
        ctx.body = {
            code: 0,
            msg: '用户或者密码错误'
        }
    }
})

//删
router.get("/api/del", async(ctx, next) => {
    let { id } = ctx.query;
    console.log(id);

    if (id || id === 0) {
        try {
            await query("delete from userlist where id=?", [id])
            ctx.body = {
                code: 1,
                msg: "删除成功"
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                msg: e.err
            }
        }
    } else {
        ctx.body = {
            code: 0,
            msg: '此用户不存在'
        }
    }
})

//改
router.post("/api/edit", async(ctx, next) => {
    let { user, pwd, address, phone, id } = ctx.request.body;

    if (id && user && pwd) {
        try {
            await query("update userlist set user=?,pwd=?,address=?,phone=? where id=? ", [user, pwd, address, phone, id])
            ctx.body = {
                code: 1,
                msg: "修改成功"
            }
        } catch (e) {
            ctx.body = {
                code: 0,
                msg: e.err
            }
        }
    } else {
        ctx.body = {
            code: 0,
            msg: '此用户不存在'
        }
    }
})

app.listen(3000)