<!-- 
    组合式API下父传子，基本思想
    1.父组件中给子组件绑定属性
    2.子组件内部通过props选项接收

    组合式API下的子传父， 基本思想
    1.父组件中给子组件标签通过@绑定事件
    2.子组件内部通过 $emit 方法触发事件
  -->

<script setup>
// setup 语法糖下局部组件无需注册直接可以使用
import Son from './Son.vue';
import {ref} from 'vue'

const count = ref(100)
const getMesage = (msg) =>{
    console.log(msg)
}

// 验证cout 是否是响应式
setTimeout(() =>{
    count.value = 200
}, 3000)


</script>

<template>
    <div class="father">
        <h2>父组件App</h2>
        <!-- 绑定属性 , :count代表响应式数据-->
         <!-- @get-message="getMesage"绑定自定义事件（子组件会触发这个事件） -->
        <Son :count="count" message="father message" @get-message="getMesage"></Son>
    </div>
</template>