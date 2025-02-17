<!--
作用：侦听一个或多个数据的变化，数据变化时执行回调函数
俩个额外参数：1.immediate(立即执行) 2.deep(深度侦听)
-->
<script setup>

// 导入watch
import { ref, watch } from 'vue'
const count = ref(0)
const changeCount = () => {
  // 脚本区域修改ref产生的响应式对象数据，必须通过.value属性
  count.value++
}

const name = ref('cp')
const changeName = () => {
  name.value = 'pc'
}



// 侦听单个数据
// 2.调用watch 侦听变化, ref 对象不需要加.value
watch(count, (newValue, oldValue) => {
  console.log(`count 发生了变化，老值为${oldValue}, 新值为${newValue}`)
}, {
  immediate: true      // 立即执行可不传
}
)

// 侦听多个数据
watch(
  [count, name],
  (
    [newCount, newName],
    [oldCount, oldName]
  ) => {
    console.log(`count 或者 name 发生了变化`, [newCount, newName], [oldCount, oldName])
  })


// deep 侦听（有性能损耗，尽量不开启）
// 默认机制： 通过watch 监听的 ref 对象默认是浅层侦听的， 直接修改嵌套的对象属性不会触发回调执行，需要开启 deep 选项
const state = ref({ count: 0 })

const changeStateBycount = () => {
  state.value.count++
}
watch(state, (newValue, oldValue) => {
  console.log(`count 发生了变化`)
}, {
  deep: true
})

// 精确侦听对象的某个属性
// 需求： 在不开启deep 的前提下， 侦听age 的变化，只有age 变化时才执行回调
const info = ref({
  name: 'chaichai',
  age: 18
})
const changeInfoName = () => {
  info.value.name = 'chaichai-teacher'
}
const changeInfoAge = () => {
  info.value.age = 20
}
watch(
  () => info.value.age,
  () => {
    console.log("age 变化了")
  }
)
</script>

<template>
  <div>
    <button @click="changeCount">修改count--{{ count }}</button>
  </div>
  <div>
    <button @click="changeName">修改name--{{ name }}</button>
  </div>
  <div>
    {{ state.count }}
    <button @click="changeStateBycount">修改state里嵌套的count--{{ name }}</button>
  </div>

  <!-- 精确侦听对象的某个属性 -->
  <div>
    <div>当前name -- {{ info.name }}</div>
    <div>当前age -- {{ info.age }}</div>
    <div>
      <button @click="changeInfoName">修改info下name</button>
      <button @click="changeInfoAge">修改info下age</button>
    </div>
  </div>
</template>