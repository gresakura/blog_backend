import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Loading } from 'element-ui';

Vue.use(Loading.directive);



import { formatDateTime } from '@/utils/format';
Vue.filter('formatDateTime', formatDateTime);

// 引入重置样式
import '../public/style/reset.css'
import './plugins/element.js'

Vue.config.productionTip = false

async function initializeRoutes() {
  await store.dispatch('menu/fetchMenu')
  // 如果 fetchMenu action 正确添加了动态路由，则不需要额外调用 addRoutes
  // 但如果 fetchMenu 不负责添加路由，您可能需要在这里调用 addRoutes
}


console.log(process.env.NODE_ENV, process.env.VUE_APP_BASE_API)

// 在应用启动前初始化路由
initializeRoutes().then(() => {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})
