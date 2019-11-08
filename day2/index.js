#!/usr/bin/env node

console.log("马上放假了");

let argvArr = process.argv.slice(2)

console.log(argvArr)

if (argvArr[0] === "--versions") {
    console.log("该版本号为v1.0.0")
} else if (argvArr[0] === "fj") {

    console.log("11.2 马上放假了");
}