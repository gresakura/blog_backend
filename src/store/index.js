import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import user from './modules/user'
import menu from './modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    menu
  },
  plugins: [
    createPersistedState({
      key: 'menuState', // 存储在 LocalStorage 中的键名
      paths: ['menu.menuList'], // 要持久化的状态路径
      storage: window.sessionStorage
    })
  ]

})
