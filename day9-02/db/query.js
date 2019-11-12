const connection = require("./db")

module.exports = (sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}