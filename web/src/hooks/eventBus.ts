type EventBusEvents = {
    [key: string]: ((...args: any) => void)[]
}
export default class EventBus {
    events: EventBusEvents
    constructor() {
        this.events = {}//消息队列
    }
    emit(eventName: string, ...args: any) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(function(fn) {
                fn(...args);
            });
        }
    }
    // 监听，执行回调
    on(eventName: string, fn: any) {
        // 如果events无事件监听，则初始化为数组
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn)
        return this
    }
    // 移除监听回调
    off(eventName: string, fn: any) {
        const func = (...args:unknown[]) => {
            this.off(eventName,func)
            fn(...args)
        }
        this.on(eventName,func)
        return this

    }
    once(eventName:string,fn:any){
        
        if(!fn){
            this.events[eventName] = [];
        }else{
            // console.log(this.events)
            this.events[eventName] = this.events[eventName].filter(item => item!= fn)
        }
        return this
    }
}