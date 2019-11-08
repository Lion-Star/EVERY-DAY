#! /usr/bin/env node

const child_process = require('child_process');

const fs = require('fs');

const path = require('path');

let filename = process.argv[2] && path.join(__dirname, process.argv[2]);

let child1 = childProcess()

function childProcess() {
    if (fs.existsSync(filename)) {
        let child = child_process.spawn("node", [filename])
        child.stdout.on("data", data => {
            console.log(data.toString());
        })

        child.stderr.on("data", error => {
            console.log(error.toString());
        })

        return child
    } else {
        throw Error("该路径不存在")
    }
}




fs.watchFile(filename, () => {

    console.log(filename + "变化了");

    child1.kill() //把当前进程杀死

    child1 = childProcess()
});
// let watcher = fs.watch(filename)
// watcher.on("change", (err, filename) => {

//     console.log(filename + "变化了");

//     child1.kill() //把当前进程杀死

//     child1 = childProcess()
// })