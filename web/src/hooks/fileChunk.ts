// 默认切片大小
export const DefualtChunkSize:number = 5 * 1024 * 1024
// 生成文件切片
const createFileChunk = (file:Blob,chunkSize:number = DefualtChunkSize):Array => {
    const fileChunkList:object[] = []
    let cur = 0
    while(cur < file.size) {
        fileChunkList.push({file: file.slice(cur, cur + chunkSize)})
        cur += chunkSize
    }
    return fileChunkList
}
// 上传切片
// async uploadChunks(fileHash) =>object {
//     const requests = file
// }

module.exports = {createFileChunk}