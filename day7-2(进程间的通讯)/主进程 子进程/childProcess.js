let startTime = process.uptime()
let num = 0;
for (let i = 0; i < 21212655; i++) {
    num += i
}
let endTime = process.uptime()

let timer = endTime - startTime;

process.send(timer)

process.on("message", (msg) => {
    console.log(msg);
})