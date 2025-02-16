<!-- 
  如何使用（以获取dom为例 组件同理）
  1.调用 ref 函数生成一个 ref 对象
  2.通过 ref 标识绑定ref对象到标签
  这两步走完以后，这个dom对象已经被存到 h1Ref.value上
-->

<script setup>
import { onMounted, ref } from 'vue';
import TestCom from './test-com.vue'

// 1.调用ref函数 -> ref 对象
const h1Ref = ref(null)
const comRef = ref(null)

// 组件挂在完成之后才能获取
onMounted(() => {
  console.log(h1Ref.value)
  console.log(comRef.value)
})

</script>

<template>
  <!-- 2.通过 ref 标识绑定 ref 对象 -->
  <h1 ref="h1Ref">我是dom标签h1</h1>
  <TestCom ref="comRef" />
</template>
