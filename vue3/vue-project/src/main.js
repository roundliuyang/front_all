import './assets/main.css'

import { createApp } from 'vue'
import App from './components/parent-child-communication/Parent.vue'

// 1.已APP 作为参数生成一个应用实例对象
// 2.挂载到id为 app 的节点上（index.html 里面的标签）
createApp(App).mount('#app')
