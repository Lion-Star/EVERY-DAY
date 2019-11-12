const mysql = require("mysql")

let connection = mysql.createConnection({
    user: "root",
    host: "localhost",
    port: "3306",
    password: "root",
    database: '1705d-wj'

})

connection.connect((error) => {
    if (error) {
        console.log("请求失败");
    } else {
        console.log("请求成功");
    }
})

module.exports = connection