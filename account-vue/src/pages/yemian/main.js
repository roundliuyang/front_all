import Vue from  'vue'
import App from  './YemianApp'
import i18n from "@/i18n"
import elementUI from "element-ui";
import swal from '@/plugins/sweetalert'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.use(elementUI);
Vue.use(swal)

// 创建了一个 Vuex 的 store 实例，用于管理应用程序的状态
const store = new Vuex.Store({
    // 在 store 中定义了一个初始状态 state，其中包含一个名为 menus 的属性，它的初始值是一个空数组 []。state 对象用于存储应用程序中需要被共享和管理的状态数据。
    state: {
        menus: [],
    },
    // 在 store 中定义了一个 mutations 对象，用于修改 state 中的数据。其中包含了一个名为 setMenus 的 mutation 方法，该方法接收两个参数：state 和 payload。
    // 当调用 setMenus mutation 时，它会将传入的 payload 设置为 state 中的 menus 属性的值。这样，调用 setMenus mutation 就可以更新 menus 的值。
    mutations: {
        setMenus: (state, payload) => state.menus = payload,
    }
});

new Vue({
    i18n,
    store,
    render: h => h(App)
}).$mount('#app')