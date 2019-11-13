const router = require("koa-router")()


//模糊搜索
router.get("/api/list", async(ctx, next) => {
    let { key } = ctx.query;
    let sql = ""
    if (!key) {
        sql = "select * from userlist"
    } else {
        sql = `select * from userlist where user like '%${key}%'`
    }
    console.log(sql);

    try {
        let list = await ctx.mysql.query(sql)
        console.log(111);

        console.log(list);

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
    let data = await ctx.mysql.query("select * from userlist")
    ctx.body = data
})

//删
router.get("/api/del", async(ctx, next) => {
    let { id } = ctx.query;
    console.log(id);

    if (id || id === 0) {
        try {
            await ctx.mysql.query("delete from userlist where id=?", [id])
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


module.exports = router