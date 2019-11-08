const http = require("http")

const fs = require("fs")

let server = http.createServer((req, res) => {
    if (req.url === "/json") {
        res.setHeader("Content-Type", "application/json")
        res.end(JSON.stringify({ code: 1, list: [1, 2, 3, 4] }))
    } else if (req.url === "/txt") {
        res.setHeader("Content-Type", "text/plain")
        res.end("txt666")
    } else if (req.url === "/jpg") {
        res.setHeader("Content-Type", "image/jpeg")
        let imgbuf = fs.readFileSync('./凯瑟琳.jpg')
        res.end(imgbuf)
    }
})

server.listen(3000, () => {
    console.log("服务启动成功");
})