<script setup>

// 导入reactive函数 
import { reactive } from 'vue';
// 导入ref 函数
import { ref } from 'vue';

// 执行函数，传入一个对象类型的参数 变量接收(响应式对象，可以引发视图更新)
const state = reactive({
  count: 0
})

// 执行函数， 传入参数[简单类型 + 对象类型] 变量接收
const size = ref(0)
console.log(size)



const setCount = () => {
  state.count++
}

const setSize = () => {
  // 脚本区域修改ref产生的响应式对象数据，必须通过.value属性
  size.value++
}



</script>

<template>
  <div>
    <button @click="setCount">{{ state.count }}</button>
  </div>
  <div>
    <button @click="setSize">{{ size }}</button>
  </div>
</template>