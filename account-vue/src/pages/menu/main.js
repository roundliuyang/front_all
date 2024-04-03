import Vue from 'vue'
import Vuex from 'vuex'
import App from './MenuApp.vue'

Vue.config.productionTip = process.env.NODE_ENV === 'production'
Vue.config.devtools = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

new Vue({
  render: h => h(App)
}).$mount('#app')