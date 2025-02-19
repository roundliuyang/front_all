// 导入一个方法 defineStore
import axios from "axios";
import { defineStore } from "pinia";
import { ref, computed } from 'vue'

const API_URL = 'http://geek.itheima.net/v1_0/channels'

// 采用组合式API风格
export const useCounterStore = defineStore('counter', () => {
    // 定义数据（state）
    const count = ref(0)

    // 定义修改数据的方法（action 同步 + 异步）
    const increment = () => {
        count.value++
    }

    // getters实现
    // Pinia 中的 getters 直接使用 computed 函数进行模拟
    const doubleCount = computed(() => count.value * 2)

    // 数据
    const list = ref([])
    // 异步action
    const loadList = async () => {
        const res = await axios.get(API_URL)
        list.value = res.data.data.channels
    }
    // 以对象大的方式return供组件使用
    return {
        count,
        doubleCount,
        increment,
        list,
        loadList
    }
})