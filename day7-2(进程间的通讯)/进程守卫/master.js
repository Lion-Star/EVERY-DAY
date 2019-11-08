const http = require("http")

const child_process = require("child_process")

let server = http.createServer((req, res) => {

})

let cpuCount = require("os").cpus().length //获取cpu的个数

console.log(cpuCount);

server.listen(3000)

let workers = {} //保存子进程



function createProcess() {
    let worker = child_process.fork("./worker.js") //创建字进程

    worker.send('server', server) //子进程与总进程通信

    workers[worker.pid] = worker

    //当子进程异常重启的时候
    worker.on('message', info => {
        console.log("error", info.pid);
    })

    //当进程重新启动的时候
    worker.on('exit', () => {
        delete workers[worker.pid];
        createProcess()
    })
}

//循环根据cpu个数创建子进程
for (var i = 0; i < cpuCount; i++) {
    createProcess()
}   