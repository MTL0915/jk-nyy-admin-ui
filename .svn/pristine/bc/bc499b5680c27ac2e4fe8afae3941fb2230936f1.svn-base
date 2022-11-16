import {
  buildMenus
} from '@/api/menu'
import Config from '@/config'
import store from '@/store'
import {
  filterAsyncRouter
} from '@/store/modules/permission'
import {
  getToken,
  removeToken,
  setToken
} from '@/utils/auth'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './routers'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/unmannedMap','/ln_login', '/vr', '/login', '/wechatLoading', '/register', '/wechatLoginBind', '/forgetPassword', '/applyBase', '/api', '/nav', '/contant', '/deviceshow', '/swtichshow',
  '/function/qrcode', '/function/qrcode/login', '/function/qrcode/setting', '/openvideo', '/autoLogin', '/introduce', '/sensorShow', '/sxt', '/expEcharts', '/myAreaDetail'
] // no redirect whitelist

router.beforeEach((to, from, next) => {
  if (to.path == "/InsideAutoLogin") {
    InsideAutoLogin(to, from, next)
    //  next()// TODO?
    return;
  }
  if (to.meta.title) {
    if (store.getters.baseInfo.documentTitle && store.getters.baseInfo.documentTitle !== null && store.getters.baseInfo.documentTitle !== '') {
      if (typeof store.getters.baseInfo.documentTitle === "string") {
        var documentTitle = JSON.parse(store.getters.baseInfo.documentTitle)
      }
      if (documentTitle.text) {
        document.title = to.meta.title + ' - ' + documentTitle.text
      }
    } else {
      document.title = to.meta.title + ' - ' + Config.webName
    }
    
  }
  NProgress.start() // start progress bar
  if (getToken()) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      if (to.query.custom_base_id) {
        next()
      } else {
        next({ path: '/' })
      }
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store
          .dispatch('GetInfo')
          .then(res => {
            // 拉取user_info
            // 动态路由，拉取菜单
            loadMenus(next, to)
          })
          .catch(err => {
            console.log(err)
            store.dispatch('LogOut').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          })
        store.dispatch('GetVisualToken')
        // 登录时未拉取 菜单，在此处拉取
      } else if (store.getters.loadMenus) {
        // 修改成false，防止死循环
        store.dispatch('updateLoadMenus').then(res => { })
        loadMenus(next, to)
      } else {
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      if (to.query.hasOwnProperty('token')) {
        setToken(to.query.token, true)
        store.commit('SET_TOKEN', to.query.token)
        delete to.query.token
        const topath = to.path
        store.dispatch('Login2').then(res => {
          next({
            path: topath
          })
          loadMenus(next, to)
        })
          .catch(err => {
            console.log(err)
            store.commit('SET_TOKEN', '')
            store.commit('SET_ROLES', [])
            removeToken()
            next(`/login`)
            NProgress.done()
          })
      } else {
        if (localStorage.getItem("basecode")) {
          if (window.location.hostname == "yun.lnystn.com") {
            next(`/ln_login?basecode=${localStorage.getItem("basecode")}`)
          } else {
            next(`/login?basecode=${localStorage.getItem("basecode")}`)
          }
        } else {
          if (window.location.hostname == "yun.lnystn.com") {
            next("/ln_login")
          }else if(window.location.hostname === "yzb.joinken.cn"){
            window.location.href="https://yzb.joinken.cn/index"
            return
          } else {
            next(`/login`) // 否则全部重定向到登录页
          }
        }
        NProgress.done()
      }
    }
  }
})

export const loadMenus = (next, to) => {
  buildMenus().then(res => {
    const asyncRouter = filterAsyncRouter(res.data)
    asyncRouter.push({
      path: '*',
      redirect: '/404',
      hidden: true
    })
    store.dispatch('GenerateRoutes', asyncRouter).then(() => {
      // 存储路由
      router.addRoutes(asyncRouter) // 动态添加可访问路由表
      next({
        ...to,
        replace: true
      }) // hack方法 确保addRoutes已完成
    })
  })
}

router.afterEach(() => {
  NProgress.done() // finish progress bar
})






//处理内部登陆
function InsideAutoLogin (to, from, next) {
  let toPath = to.query.to
  let code = to.query.code
  if (!toPath) {
    console.error("未指定前往路径");
    return;
  }
  if (!code) {
    console.error("没有登陆CODE");
    return;
  }
  getAToken(code, function (data) {
    setToken(data.data.token, false);
    router.replace({
      path: toPath,
      query: {}
    })
  })
}




function getAToken (enConetnt, callback) {
  var baseURL = process.env.BASE_API;
  var login = baseURL + '/auth/directLogin4'
  var xhr = new XMLHttpRequest();
  xhr.open('post', login);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send('code=' + enConetnt);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var json = JSON.parse(xhr.responseText);
      callback && callback(json)
    }
  }
}
