export default class EventBus {
    constructor() {
        this.event = {}
    }

    $on(eventName, callback) {
        if (!this.event[eventName]) {
            this.event[eventName] = [callback]
        } else {
            this.event[eventName].push(callback)
        }
    }

    $emit(eventName, ...arg) {

        this.event[eventName].forEach((item, index) => {
            item(...arg);
        })
    }

}