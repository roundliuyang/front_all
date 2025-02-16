<!-- 
    组合式API下父传子，基本思想
    1.父组件中给子组件绑定属性
    2.子组件内部通过props选项接收
  -->
<script setup>
// setup 语法糖下局部组件无需注册直接可以使用
import Son from './Son.vue';
import {ref} from 'vue'

const count = ref(100)

// 验证cout 是否是响应式
setTimeout(() =>{
    count.value = 200
}, 3000)

</script>

<template>
    <div class="father">
        <h2>父组件App</h2>
        <!-- 绑定属性 , :count代表响应式数据-->
        <Son :count="count" message="father message"></Son>
    </div>
</template>