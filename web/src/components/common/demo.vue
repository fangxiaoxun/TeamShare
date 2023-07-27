<script lang="ts" setup>
import * as Y from 'yjs'
import { ref } from 'vue';
// import { ySyncPlugin, yWebsocketsClient } from 'y-websockets-client'
// import { WebsocketProvider } from 'y-websocket'
import { useInfo } from '@/store/user';
const userInfo = useInfo()
const content = ref<string>('')
const collaborators = ref<object>({})

const ydoc = new Y.Doc()
const yarray = ydoc.getArray('content')
yarray.observe(() => {
    content.value = yarray.toArray().join('')

})

const websocketUrl = 'ws://localhost:5017'
const roomName = 'room1'
const awarenessOptions = {name:userInfo.getUsername}
// const provider = new WebsocketProvider(websocketUrl,roomName,ydoc,{awareness:new Y.Awareness(ydoc)})




</script>
<template>
    <div class="testBox"></div>
</template>
<style lang="less" scoped>
</style>