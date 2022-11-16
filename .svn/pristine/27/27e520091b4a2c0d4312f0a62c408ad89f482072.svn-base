import {
  login,
  getInfo,
  getDataViewToken,
  login2,
  autoLogin,
  phoneLogin
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  authinfo
} from '@/api/user'
import { getDeviceUserPermissionByNowUser } from '@/api/equip';

const user = {
  state: {
    token: getToken(),
    user: {},
    roles: [],
    id: '',
    // 第一次加载菜单时用到
    loadMenus: false,
    visualToken: '',
    basecode: '',
    loginConfig: {},
    deviceUserPermission:[]
  },

  mutations: {
    SET_TOKEN: (state, token) => {

      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_LOAD_MENUS: (state, loadMenus) => {
      state.loadMenus = loadMenus
    },
    SET_VISUAL_TOKEN: (state, token) => {
      state.visualToken = token
    },
    SET_BASECODE: (state, basecode) => {
      state.basecode = basecode
    },
    SET_LOGINCONFIG: (state, loginConfig) => {
      state.loginConfig = loginConfig
    },
    SET_DEVICEUSERPERMISSION:(state,deviceUserPermission)=>{
      state.deviceUserPermission = deviceUserPermission
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      const username = userInfo.username
      const password = userInfo.password
      const code = userInfo.code
      const uuid = userInfo.uuid
      const rememberMe = userInfo.rememberMe
      const _this = this
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid)
          .then(res => {
            if (res.code === 200) {
              setToken(res.data.token, rememberMe)
              commit('SET_TOKEN', res.data.token)
              setUserInfo(res.data.user, commit)
              // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
              commit('SET_LOAD_MENUS', true)
              resolve(res)
            } else {
              reject(res)
            }
          })
      })
    },
    phone({
      commit
    }, userInfo) {
      const data = new FormData()
      data.append("phone", userInfo.phone)
      data.append("phoneVerificationCode", userInfo.phoneVerificationCode)
      const _this = this
      return new Promise((resolve, reject) => {
        phoneLogin(data)
          .then(res => {
            if (res.code === 200) {
              setToken(res.data.token, false)
              commit('SET_TOKEN', res.data.token)
              setUserInfo(res.data.user, commit)
              // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
              commit('SET_LOAD_MENUS', true)
              resolve(res)
            } else {
              reject(res)
            }
          })
      })
    },
	autoLogin2({
      commit
    }, token) {
      return new Promise((resolve, reject) => {  
			setToken(token, false)
			commit('SET_TOKEN',token)
			authinfo().then(res=>{	
				setUserInfo(res.data, commit)
				// 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
				commit('SET_LOAD_MENUS', true) 
				resolve(res)
			
		  }).catch(err=>{
			  window.location.href="https://"+process.env.DOMAIN+"/"
		  }) 
      })
    },
    autoLogin({
      commit
    }, userInfo) {
      const postData = new FormData()
      postData.append("username", userInfo.username);
      postData.append("password", userInfo.password);
      return new Promise((resolve, reject) => {
        autoLogin(postData)
          .then(res => {
            if (res.code === 200) {
              setToken(res.data.token, false)
              commit('SET_TOKEN', res.data.token)
              setUserInfo(res.data.user, commit)
              // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
              commit('SET_LOAD_MENUS', true)
              resolve(res)
            } else {
              reject(res)
            }
          })
      })
    },

    Login2({
      commit
    }) {
      return new Promise((resolve, reject) => {
        login2()
          .then(res => {
            console.log(res)
            setUserInfo(res.data.user, commit)
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },

    // 获取用户信息
    GetInfo({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(res => {
            setUserInfo(res.data, commit)
            commit('SET_ID', res.data.id)
            resolve(res)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    //提交token
    SetToken({ commit }, token) {
      commit("SET_BASE_ID", token);
    },
    SetLoadMenus({ commit }, data) {
      commit("SET_LOAD_MENUS", data)
    },
    //提交basecode
    setBaseCode({ commit }, basecode) {
      commit("SET_BASECODE", basecode);
    },
    //提交登录模板配置
    setLoginConfig({ commit }, loginConfig) {
      commit("SET_LOGINCONFIG", loginConfig);
    },
    // 登出
    LogOut({
      commit
    }) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    },

    updateLoadMenus({
      commit
    }) {
      return new Promise((resolve, reject) => {
        commit('SET_LOAD_MENUS', false)
      })
    },

    // 获取大屏token
    GetVisualToken({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getDataViewToken().then(res => {
          if (res.code >= 500){
            console.log("获取大屏token失败:" + res.msg);
          }else{
            commit('SET_VISUAL_TOKEN', res.data.token)
            resolve(res.data.token);
          }
        })
      })
    }
  }
}

export const setUserInfo = (user, commit) => {
  // 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
  if (user.roles.length === 0) {
    commit('SET_ROLES', ['ROLE_SYSTEM_DEFAULT'])
  } else {
    commit('SET_ROLES', user.roles)
  }
  commit('SET_USER', user)

  getDeviceUserPermissionByNowUser().then(res2 => {
    if (res2.code === 200) {
      commit('SET_DEVICEUSERPERMISSION', res2.data)
    }
  })
}

export default user
