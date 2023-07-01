type EventBusEvents = {
    [key: string]: ((...args: any) => void)[]
}
export default class EventBus {
    events: EventBusEvents
    constructor() {
        this.events = {}//消息队列
    }
    emit(eventName: string, ...args: any) {
        // const cbs = this.events[eventName]
        // if (!cbs) {
        //     console.log('没有当前事件');
        //     return this
        // }
        // // 遍历执行所有回调
        // cbs.forEach((cb) => {
        //     cb(...args)
        // })

        // // 链式调用
        // return this
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
        // if (this.events[eventName]) {
        //     for (let i = 0; i < this.events[eventName].length; i++) {
        //         if (this.events[eventName][i] === fn) {
        //             this.events[eventName].splice(i, 1);
        //             break;
        //         }
        //     }
        // }
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