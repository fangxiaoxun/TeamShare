import { onMounted,onUnmounted } from "vue";

// 给指定元素添加事件监听器
export function useEventListener(
    target: HTMLElement | Window | string,
    event: keyof HTMLElementEventMap,
    callback:(this:HTMLElement,ev : any) => any
    ){
        // 挂载时绑定事件监听
        onMounted(()=>{
            (typeof target === 'string' ? document.querySelector(target) : target)?.addEventListener(event,callback)
        })

        // 卸载时解绑监听
        onUnmounted(() =>(typeof target === 'string' ? document.querySelector(target) as HTMLElement : target).removeEventListener(event, callback))
}
