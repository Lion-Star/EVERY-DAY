const http = require("http")
const child_process = require("child_process")

let server = http.createServer((req, res) => {
    if (req.url === "/child") {
        let childProcess = child_process.fork("./childProcess.js")

        childProcess.on("message", (timer) => {
            console.log(timer);

            // res.end(timer)
        })
        childProcess.send("主进程的数据")
    }
})

server.listen(3000)