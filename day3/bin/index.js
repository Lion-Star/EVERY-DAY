#! /usr/bin/env node

let app = require("../server/index")


let { version } = require("../package.json")

let port = process.argv[2] && process.argv[3] ? process.argv[3] : 8080;

console.log(port);


if (process.argv[2] === "-v") {
    console.log(version);
} else {
    console.log(port);

    app.listen(port, () => {
        console.log("服务启动成功", port);
    })
}