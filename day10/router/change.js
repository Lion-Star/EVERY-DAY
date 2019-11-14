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
    try {
        let total = await ctx.mysql.query("select count(*) from userlist")

        console.log(ctx.query);

        let { pageNum = 1, limit = 2 } = ctx.query


        let startIndex = (pageNum - 1) * limit


        let data = await ctx.mysql.query(`select * from userlist limit ${startIndex},${limit}`)


        ctx.body = {
            code: 1,
            total: total[0]["count(*)"],
            data: data
        }
    } catch (e) {
        ctx.body = {
            code: 0,
            msg: e
        }
    }
})

//删
router.get("/api/del", async(ctx, next) => {
    console.log(ctx.query);

    let { id } = ctx.query;
    console.log("111", id);

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