<!-- 
 生命周期函数基本使用 
 1.导入生命周期函数
 2.执行生命周期函数 传入回调
 -->
<script setup>

// 引入函数
import { onMounted } from 'vue'

// 执行函数， 传入回调
onMounted(() => {
  console.log('组件挂在完毕mounted执行了1')
})

onMounted(() => {
  console.log('组件挂在完毕mounted执行了2')
})
</script>

<template>
</template>