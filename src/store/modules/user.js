import { login } from '@/api/user'
import {getToken, setToken, removeToken, setUserName, getUserName, removeUserName} from '@/utils/auth'
import router, { resetRouter } from '@/router'
const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  username: {},
  modalOpen: false,
  itemBlog: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  MODAL_OPEN: (state, payload) => {
    state.modalOpen = payload
  },
  SET_USER_NAME: (state, payload) => {
    state.username = payload;
    state.listUserData = payload
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ITEM_BLOG (state, payload) {
    state.itemBlog = payload
  }
}

const actions = {
  itemDataChanges ({commit}, payload) {
    commit('SET_ITEM_BLOG', payload)
  },
  setUserNewData ({commit}, payload) {
    commit('SET_USER_NAME', payload)
  },
  handelModal ({commit}, payload) {
    commit('MODAL_OPEN', payload)
  },
  login({ commit }, userInfo) {
    const { email, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ email: email.trim(), password: password }).then(response => {
        // console.log('response ===>>', response)
        const { admin, token } = response
        commit('SET_USER_NAME', admin)
        commit('SET_TOKEN', token)
        setToken(token)
        setUserName(admin)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      const data = {
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        introduction: 'I am a super administrator',
        name: 'Super Admin',
        roles: [JSON.parse(getUserName()).role]
      }

      if (!data) {
        reject('Verification failed, please Login again.')
      }

      const { roles, name, avatar, introduction } = data

      // roles must be a non-empty array
      if (!roles || roles.length <= 0) {
        reject('getInfo: roles must be a non-null array!')
      }

      commit('SET_ROLES', roles)
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      commit('SET_INTRODUCTION', introduction)
      resolve(data)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // user logout
  logout({ commit, dispatch }) {
    commit('SET_TOKEN', '')
    commit('SET_ROLES', [])
    commit('SET_USER_NAME', {})

    removeToken()
    resetRouter()
    removeUserName()
    dispatch('tagsView/delAllViews', null, { root: true })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
