import Vue from 'vue'
// import Vuex from 'vuex'
import App from './MenuApp.vue'
import elementUI from "element-ui";
import ele_zh from "element-ui/lib/locale/lang/zh-CN";
import 'element-ui/lib/theme-chalk/button.css'
import i18n from "@/i18n";

// import ele_en from "element-ui/lib/locale/lang/en";
//
// Vue.config.productionTip = process.env.NODE_ENV === 'production'
// Vue.config.devtools = process.env.NODE_ENV !== 'production'
//
// Vue.use(Vuex)

// import Env from '@/env'
// let locale = ele_zh;
// if (Env.locale === "1") {
//   locale = ele_en;
// }
Vue.use(elementUI,ele_zh);
new Vue({
  i18n,
  render: h => h(App)
}).$mount('#app')