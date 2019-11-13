const router = require("koa-router")()

//增
router.post("/api/login", async(ctx, next) => {
    let { user, pwd, address, phone } = ctx.request.body;
    if (user && pwd) {
        let user1 = await ctx.mysql.query('select * from userlist where user=?', [user]);
        if (user1.length) {
            ctx.body = {
                code: 0,
                msg: '此人已存在'
            }
        } else {
            try {
                await ctx.mysql.query("insert into userlist (user, pwd, address, phone) values (?,?,?,?)", [user, pwd, address, phone])
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



//改
router.post("/api/edit", async(ctx, next) => {
    let { user, pwd, address, phone, id } = ctx.request.body;

    if (id && user && pwd) {
        try {
            await ctx.mysql.query("update userlist set user=?,pwd=?,address=?,phone=? where id=? ", [user, pwd, address, phone, id])
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

module.exports = router