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
</script>

<template>
    <div class="son">
        <h3>子组件Son</h3>
        <div>
            父组件传入的视频 - {{ message }} - {{ count }}
        </div>
    </div>
</template>