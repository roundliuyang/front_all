<!-- 
跨层传递普通数据
1.顶层组件通过provider函数提供数据
2.底层组件通过inject函数获取数据
-->

<script setup>
import RoomMsgItem from './room-msg-item.vue';
import { provide, ref } from 'vue';

// 组件嵌套关系：
// RoomPage -> RoomMsgItem -> RoomMsgComment

// 1.顶层组件提供数据
provide('data-key', 'this is room data')

// 传递响应式数据
const count = ref(0)
// 跨层传递方法(谁的数据谁负责修改)
// 顶层组件可以向底层组件传递方法，底层组件调用方法修改顶层组件中的数据
const setCount = () => {
  count.value++
}
provide('count-key', count)
provide('setCount-key', setCount)


setTimeout(() => {
  count.value = 100
}, 3000)
</script>

<template>
  <div class="page">
    顶层组件
    <RoomMsgItem />
  </div>
</template>

<style scoped>
</style>