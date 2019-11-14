const connection = require("../db/db")

let query = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

module.exports = () => {
    return async(ctx, next) => {
        ctx.mysql = {} //给ctx添加一个mysql对象
        ctx.mysql.query = query
        await next()
    }
}