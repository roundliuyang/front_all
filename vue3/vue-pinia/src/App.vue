<script setup>

// 1.导入 use 打头的方法
import { useCounterStore } from '@/stores/counter'
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

// 2.执行方法得到store实例对象
const counterStore = useCounterStore()
console.log(counterStore)

// 调用异步action
onMounted(() => {
  counterStore.loadList()
})

// 直接解构赋值（响应式丢失）
//  const { count, doubleCount} = counterStore

// 使用它storeToRefs包裹之后解构保持响应式
const { count, doubleCount } = storeToRefs(counterStore)
// 方法直接从原来的 counterStore 中解构赋值
const { increment } = counterStore
</script>

<template>
  <div>
    <button @click="counterStore.increment">{{ counterStore.count }}</button>
    {{ counterStore.doubleCount }}
    <!-- 异步 action -->
    <ul>
      <li v-for="item in counterStore.list" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>

    <!-- storeToRefs包裹之后解构保持响应式 -->
    <button @click="increment">{{ count }}</button>
    {{ doubleCount }}
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
