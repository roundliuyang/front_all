<script setup>

// defineProps({
//     message: String
// })

// defineProps接收数据
// 通过 defineProp "编译器宏" 接收子组件传递的数据
const props = defineProps({
    message: String,
    count: Number
})
console.log(props)

// 通过defineEmits编译器宏生成 emit 方法 --> 这个方法等同于emit(this.$emit)
const emit = defineEmits(['get-message'])
const sendMsg = () =>{
    // 触发自定义事件 传数据给父组件
    emit('get-message', 'this is son message')
}
</script>

<template>
    <div class="son">
        <h3>子组件Son</h3>
        <div>
            父组件传入的数据 - {{ message }} - {{ count }}
        </div>
        <button @click="sendMsg">触发自定义事件</button>
    </div>
</template>