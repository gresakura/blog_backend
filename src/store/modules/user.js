import { login, logout } from '@/api/user'

const state = {
  token: localStorage.getItem('token'),
  nameId: null,
  avatar: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME_ID: (state, nameId) => {
    state.nameId = nameId
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // 用户登录
  login({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ account: account.trim(), password: password })
        .then(response => {
          const { data } = response
          commit('SET_TOKEN', data.token)
          commit('SET_NAME_ID', data.id)
          localStorage.setItem('token', data.token)
          localStorage.setItem('user', JSON.stringify(data))
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 用户登出
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout()
        .then(() => {
          commit('SET_TOKEN', '')
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 移除 token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      localStorage.removeItem('token')
      resolve()
    })
  }
}

export default {
  namespaced:true,
  state,
  mutations,
  actions,
}