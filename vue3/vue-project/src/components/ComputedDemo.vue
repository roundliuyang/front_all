<script setup>

// ref 
import { ref } from 'vue'
// 1.导入computed
import { computed } from 'vue'

// 原始响应数组
const list = ref([1, 2, 3, 4, 5, 6, 7, 8])
// 2.执行函数 return计算之后的值 变量接收。避免直接修改计算属性的值，计算属性应该是只读的（除特殊场景）。
const computedList = computed(() => {
  // 作用：做计算，根据一个数据计算得到一个新的数据
  return list.value.filter(item => item > 2)
})

setTimeout(() => {
  list.value.push(9, 10)
}, 3000)
</script>

<template>
  <div>
    原始响应数组- {{ list }}
  </div>
  <div>
    计算属性数组- {{ computedList }}
  </div>
</template>