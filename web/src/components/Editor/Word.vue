<template>
    <input ref="doc" accept=".docx" type="file" @click="getWordFile">
    <p ref="docShow"></p>
    <a href="http//localhost:3000/img/2023-07-18-21-25-31《管理信息系统》实验报告3.doc" download="true">下载文件</a>
</template>
          
<script lang="ts" setup>
import mammoth from "mammoth";
import { ref } from "vue"
import axios from "axios"
interface EventTarget {
    files: Array<Blob>
}

const docShow = ref()
const options: object = {
    styleMap: [
        "p[style-name='Section Title'] => h1:fresh",
        "p[style-name='Subsection Title'] => h2:fresh"
    ],
    ignoreEmptyParagraphs: false
}


const getWordFile = (e: MouseEvent): void => {
    axios({
        url: 'http://localhost:3000/img/2023-07-18-22-05-03“治郁”互联网＋（第六版）修改.docx',	// 本地文件夹路径+本地文件名称(若资源在服务器，且是具体的路径，这里可改成该资源路径，此时封装的方法需要微调，入参的localFileName改成资源路径resource)
        method: 'get',
        responseType: 'blob',
    }
    ).then(res => {
        console.log('res', res);
        const blob: Blob = new Blob([res.data])
        let reader: FileReader = new FileReader()
        reader.onload = (ev: ProgressEvent<FileReader>) => {
            const arrayBuffer = <ArrayBuffer>reader.result
            console.log(arrayBuffer);
            
            mammoth
                .convertToHtml({ arrayBuffer: arrayBuffer }, options)
                .then(res => {
                    console.log('value', res.value);

                    //res.value 就是生成的HTML文件，可以直接赋值给富文本编辑器
                    docShow.value.innerHTML = res.value
                }).catch(err =>{
                    console.log(err);
                    
                })
        }
        reader.readAsArrayBuffer(blob)
    })
    // const fileUrl = "http:localhost:3000/img/2023-07-18-22-05-03“治郁”互联网＋（第六版）修改.docx"
    // const arrayBuffer: ArrayBuffer = strToAB(fileUrl)
    // console.log(arrayBuffer);

    // if ((e.target as unknown as EventTarget).files.length == 0) return
    // const file = (e.target as unknown as EventTarget).files[0]
    // let reader:FileReader = new FileReader()
    // reader.readAsArrayBuffer(file)
    // reader.onload = (evt:ProgressEvent<FileReader>) => {
    //     let arrayBuffer = evt.target?.result as ArrayBuffer
    // mammoth
    //     .convertToHtml({ arrayBuffer: arrayBuffer }, options)
    //     .then(res => {
    //         console.log(res.value);

    //         //res.value 就是生成的HTML文件，可以直接赋值给富文本编辑器
    //         docShow.value.innerHTML = res.value
    //     })
    // .done()
    // }
}



// 字符串转为ArrayBuffer对象，参数为字符串
const strToAB = (str: string): ArrayBuffer => {
    const buf: ArrayBuffer = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
    const bufView: Uint16Array = new Uint16Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
</script>
          
<style lang="less"></style>