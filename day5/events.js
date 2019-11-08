const { EventEmitter } = require("events").EventEmitter

let ev = new EventEmitter()


let callback = () => {
    console.log("some_event");
}

ev.on("some_event", callback)

ev.on("some_event1", () => {
    console.log("some_event1");

})

//删除单个监听器
ev.removeListener("some_event", callback)

//删除所有监听器
ev.removeAllListeners()

ev.emit("some_event")

ev.emit("some_event1")

console.log(process.platform)