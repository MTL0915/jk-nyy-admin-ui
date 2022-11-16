<template>
  <div class="login">
    <!-- 轮播图 -->
    <swiper
      ref="swiper"
      :options="swiperOption"
      class="swiperImg"
    >
      <swiper-slide class="swiper">
        <img
          src="../../assets/login/bg2.jpg"
          class="bgImg"
        >
      </swiper-slide>
      <swiper-slide class="swiper">
        <img
          src="../../assets/login/bg3.jpg"
          class="bgImg"
        >
        <div
          ref="bgline"
          class="bgline"
        >
          <img
            src="../../assets/login/bgline.png"
            class="line"
          >
        </div>
      </swiper-slide>
      <swiper-slide class="swiper">
        <img
          src="../../assets/login/bg4.jpg"
          class="bgImg"
        >
        <div
          ref="bgAnimate"
          class="bgAnimate"
        >
          <img
            src="../../assets/login/bg4-1.png"
            class="bgAnimateImg1"
            style="width: 70px;"
          >
          <img
            src="../../assets/login/bg4-2.png"
            class="bgAnimateImg2"
            style="width: 50px;"
          >
          <img
            src="../../assets/login/bg4-3.png"
            class="bgAnimateImg3"
            style="width: 50px;"
          >
          <img
            src="../../assets/login/bg4-4.png"
            class="bgAnimateImg4"
            style="width: 70px;"
          >
          <img
            src="../../assets/login/bg4-5.png"
            class="bgAnimateImg5"
            style="width: 60px;"
          >
        </div>
      </swiper-slide>
    </swiper>

    <div class="loginHeader">
      <div class="headerContent">
        <div class="logo">
          <img
            src="../../assets/logo/jk_logo.png"
            style="height:40px"
          >

          <!-- <p style="font-size:20px;line-height:40px;color:#fff">物联网信息服务平台</p> -->

        </div>
        <div class="logo-centent">
          <div class="centent">
            <img
              src="../../assets/logo/des.png"
              style="height:40px"
            >
          </div>
        </div>
        <div class="loading">
          <div style="line-height:60px">
            <!-- <img src="@/assets/login/appLoad.png" style="vertical-align:middle"> -->
            <span style="color:#fff">关注公众号</span>
          </div>
          <!-- APP下载 -->
          <!-- <div class="APPLoad"> -->
          <div
            class="APPLoad"
            style="position:absolute;top:60px;left:50%;transform:translate(-50%);background:#fff"
          >
            <div style="display:flex;font-size:12px">
              <span class="phoneTab">公众号</span>
            </div>
            <div class="ios">
              <img
                src="../../assets/login/officialAccounts.jpg"
                class="loginImg2"
              >
              <p>微信扫描关注公众号</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
      label-width="0px"
      class="login-form"
    >
      <h1
        class="title"
        style="font-size:19px"
      >农语云</h1>
      <div class="loginCheck">
        <div
          class="APPLogin"
          @click="scanCodeLoad"
        >
          <div
            ref="APP"
            :class="[loginFlag ? 'dont' : 'APP']"
          >
            <img :src="APPImg"><span style="font-size:14px;cursor:default">扫码登录</span>
          </div>
        </div>
        <div
          class="PCLogin"
          @click="accountLogin"
        >
          <div
            ref="PC"
            :class="[loginFlag ? 'PC' : 'dont']"
          >
            <img :src="PCImg"><span style="font-size:14px;cursor:default">账号登录</span>
          </div>
        </div>
      </div>

      <!-- 账号登录登录 -->
      <div
        v-show="currentTab === 'account'"
        class="loginCentent"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            type="text"
            auto-complete="off"
            placeholder="请输入账号"
          >
            <svg-icon
              slot="prefix"
              icon-class="user"
              class="el-input__icon"
              style="height: 39px;width: 13px;margin-left: 2px;"
            />
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            auto-complete="off"
            placeholder="请输入登录密码"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon
              slot="prefix"
              icon-class="password"
              class="el-input__icon"
              style="height: 39px;width: 13px;margin-left: 2px;"
            />
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            auto-complete="off"
            placeholder="请输入验证码"
            style="width: 60%"
            @keyup.enter.native="handleLogin"
          />
          <div class="login-code">
            <img
              :src="codeUrl"
              @click="getCode"
            >
          </div>
        </el-form-item>
        <!-- <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 15px 0px;">记住密码</el-checkbox> -->
        <div style="width:100%;height:25px;line-height: 25px;margin-bottom: 30px;color:#1D3E56">
          <el-checkbox
            v-model="loginForm.rememberMe"
            style="color:#1D3E56;font-size: 12px;"
          >记住密码</el-checkbox>
          <div style="text-align: center;float:right">
            <!-- <a style="color: rgba(2,18,65,0.95);border-bottom:1px solid #1D3E56">微信登录</a>
            &nbsp;&nbsp;&nbsp; -->
            <router-link to="register">
              <a style="color: rgba(2,18,65,0.95);border-bottom:1px solid #1D3E56">新用户注册</a>
            </router-link>
            &nbsp;&nbsp;&nbsp;
            <router-link to="forgetPassword">
              <a style="color: rgba(2,18,65,0.95);border-bottom:1px solid #1D3E56">忘记密码</a>
            </router-link>
          </div>
        </div>
        <el-form-item style="width:100%;line-height: 30px;margin-bottom:5px;background-color:#113651">
          <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width:100%;color:#FBF6F1;background-color:#113651;border:none;height: 50px;"
            @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>
      </div>

      <!-- 扫码登录 -->
      <div v-show="currentTab ==='scancode'">
        <div style="heigth:283px;text-align:center">
          <div id="login_container"></div>
        </div>
      </div>
    </el-form>
    <div
      v-if="codeOpen"
      class="imgLayer"
      @click="codeOpen = flase"
    >
      <img
        src="../../assets/login/code.png"
        class="layer"
      >
    </div>
  </div>
</template>

<script>
import Config from '@/config'
import { getCodeImg, initIndex } from '@/api/login'
import { wechatAuth, wechatBind } from '@/api/wechatAuth'
import Cookies from 'js-cookie'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { setToken, getToken } from '@/utils/auth'
import { setUserInfo } from "@/store/modules/user"

import pclogin from '@/assets/login/pclogin.png'
import pclogin2 from '@/assets/login/pclogin2.png'
import app2 from '@/assets/login/app2.png'
import app1 from '@/assets/login/app1.png'

const CURRENT_INDEX = 3
const CURRENT_INDEX_L = 2
const flag = false

export default {
  name: 'Login',
  components: {
    swiper,
    swiperSlide
  },
  data () {
    const _this = this
    return {
      DOMAIN: process.env.DOMAIN,
      // 判断是否进行了token加载
      isLoadNyyToken: false,
      // 农语云token值
      nyytoken: null,
      currentTab: 'scancode',
      loginFlag: false,
      codeOpen: false,
      currentIndex: 0,
      swiperOption: {
        spaceBetween: 0,
        loop: true,
        speed: 1000,
        autoHeight: true,
        centerdSlides: true,
        setWrapperSize: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        on: {
          transitionEnd () {
            // _this.currentIndex = this.activeIndex
            // console.log(this.activeIndex)
            if (this.activeIndex === CURRENT_INDEX_L) {
              function lineAnimation (args) {
                _this.$refs.bgline.style.opacity = args
              }
              for (let i = 0; i < 10; i++) {
                setTimeout((function (pos) {
                  return function () {
                    lineAnimation(pos)
                  }
                }(i / 10)), i * 100)
              }
            } else if (this.activeIndex === CURRENT_INDEX) {
              function someAnimation (args) {
                _this.$refs.bgAnimate.style.opacity = args
              }
              for (let i = 0; i < 10; i++) {
                setTimeout((function (pos) {
                  return function () {
                    someAnimation(pos)
                  }
                }(i / 10)), i * 100)
              }
            } else {
              _this.$refs.bgAnimate.style.opacity = '0'
              _this.$refs.bgline.style.opacity = '0'
            }
          }
        }

      },
      codeUrl: '',
      loginForm: {
        username: '',
        password: '',
        rememberMe: true,
        code: '',
        uuid: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        code: [{ required: true, trigger: 'change', message: '验证码不能为空' }]
      },
      loading: false,
      redirect: undefined,
      openid: ''
    }
  },
  computed: {
    PCImg () {
      if (this.loginFlag) {
        return pclogin
      } else {
        return pclogin2
      }
    },
    APPImg () {
      if (this.loginFlag) {
        return app2
      } else {
        return app1
      }
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  created () {


    //this.$confirm('您好，物联网农语云平台地址已变更！', '通知', {
    //confirmButtonText: '确定',
    //showCancelButton:false,
    //type: 'warning'
    //}).then(() => {
    //window.location.href = "https://"+this.DOMAIN;
    //})
    this.getCode()
    this.getCookie()
    this.getWechatCode()
    // 获取来源网址
    this.fromUrl = this.$router.history.current.query.fromUrl;
  },
  mounted () {
    this.getQrCode()
  },
  methods: {
    //获取微信登录二维码
    getQrCode () {
      var obj = new WxLogin({
        self_redirect: false,
        id: "login_container",
        appid: "wx0c6862644c7b9e24",
        scope: "snsapi_login",
        redirect_uri: "http%3A%2F%2Fiot.joinken.cn%2Flogin",
        state: "state",
        style: "",
        href: "https://" + this.DOMAIN + "/picture/iot/wechat.css"
      });
    },
    getWechatCode () {
      const code = this.GetQueryString("code")
      if (code === null) {
        this.openid = ''
        return;
      } else {
        const data = {
          code: code
        }
        //获取微信openid
        wechatAuth(data).then(res => {
          if (res.code === 200) {
            if (!res.data.authenticationInfo) {
              this.$router.push({
                name: 'wechatLoginBind',
                query: {
                  bindID: res.data.web.openid
                }
              })
              return;
            } else {
              //微信登录
              setToken(res.data.authenticationInfo.token, false)
              this.$store.dispatch("SetToken", res.data.authenticationInfo.token)
              //setUserInfo(res.data.authenticationInfo.user, commit)
              // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
              this.$store.dispatch('SetLoadMenus', true)
              this.$store.dispatch('GetVisualToken')
              this.$store.dispatch('GetInfo').then(res => {
                // 无角色无权限，进入到申请（创建）基地的流程
                // if (res.data.roles.length == 0) {
                //   this.$router.push({ path: '/applyBase' })
                // } else {
                // initIndex().then(res => { })
                this.$router.push({ path: this.redirect || '/' })
                // }
              }).catch(err => {
                console.log(err)
              })
            }
          } else {
            this.$message({
              message: '微信授权失败！',
              type: 'warning'
            });
            this.openid = ''
          }
        })
      }
    },
    //获取url参数字段
    GetQueryString (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    },
    getCode () {
      getCodeImg().then(res => {
        this.codeUrl = 'data:image/gif;base64,' + res.data.img
        this.loginForm.uuid = res.data.uuid
      })
    },
    getCookie () {
      const username = Cookies.get('username')
      let password = Cookies.get('password')
      const rememberMe = Cookies.get('rememberMe')
      password = password === undefined ? this.loginForm.password : password
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        code: ''
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {

        const user = this.loginForm
        if (valid) {
          this.loading = true
          if (user.rememberMe) {
            Cookies.set('username', user.username, { expires: Config.passCookieExpires })
            Cookies.set('password', user.password, { expires: Config.passCookieExpires })
            Cookies.set('rememberMe', user.rememberMe, { expires: Config.passCookieExpires })
          } else {
            Cookies.remove('username')
            Cookies.remove('password')
            Cookies.remove('rememberMe')
          }

          this.$store.dispatch('Login', user).then(result => {
            // 开始出现加载loading
            this.loading = false
            // 获取大屏token
            this.loadNyyToken();
            // 获取用户登录并进行跳转
            this.getUser();
          }).catch(res => {
            this.$message.error(res.msg)
            this.loading = false
            this.getCode()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    accountLogin () {
      this.currentTab = 'account'
      this.loginFlag = true
    },
    scanCodeLoad () {
      this.currentTab = 'scancode'
      //this.getQrCode()
      this.loginFlag = false
    },
    getUser () {
      this.$store.dispatch('GetInfo').then(res => {
        // 判断是否有记录进来的url 然后判断url 成功后跳转回到来时的页面地址
        if (this.fromUrl) {
          this.getNyyToken((nyytoken) => {
            location.href = unescape(this.fromUrl) + "&token=" + nyytoken;
          })
        } else {
          this.$router.push({ path: this.redirect || '/' });
        }
      }).catch(err => {
        console.log(err)
      })
    },
    loadNyyToken (fn) {
      this.$store.dispatch('GetVisualToken').then((nyytoken) => {
        this.nyytoken = nyytoken;
        this.isLoadNyyToken = true;
        this.tokenNyyFnArray && this.tokenNyyFnArray.forEach((e) => { return e(nyytoken) });
      })
    },
    getNyyToken (fn) {
      if (this.isLoadNyyToken == false) {
        this.tokenNyyFnArray || (this.tokenNyyFnArray = []);
        this.tokenNyyFnArray.push(fn);
        return;
      } else {
        fn && fn(this.nyytoken);
      }
    }
    // codeOpen() {
    //   this.codeOpen = true
    // }
  }
}
</script>

<style lang="stylus">
@import 'swiper/dist/css/swiper.css'

.login
  // background: url("../../assets/login/bg4.jpg");
  background-size cover

.bgline
  position absolute
  left 0
  top 0
  opacity 0

.line
  width 100%
  height 100%

.swiperImg
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  z-index -999

.bgImg
  width 100%
  height 100%

.bgAnimate
  position absolute
  left 0
  bottom 0
  width 100%
  height 100%
  opacity 0

.bgAnimate img
  position absolute

.bgAnimateImg1
  left 12%
  bottom 34%

.bgAnimateImg2
  left 16%
  bottom 50%

.bgAnimateImg3
  left 22%
  bottom 52%

.bgAnimateImg4
  left 32%
  bottom 52%

.bgAnimateImg5
  left 34%
  bottom 40%

.gbLine
  position absolute
  left 0
  top 0
  width 100%
  height 100%
  transform translateX(100%)

.login
  display flex
  flex-direction column
  // justify-content: center;
  // align-items: center;
  align-items flex-end
  height 100%

.loginHeader
  flex 0 0 60px
  background rgba(11, 50, 79, .8)
  width 100%

.headerContent
  display flex

.logo
  flex 1
  margin-left 60px
  padding-top 10px

.logo-centent
  flex 2
  padding-top 10px
  text-align right
  margin-right 60px

.login .title
  margin 0px auto 30px auto
  margin-bottom 15px
  text-align center
  color #707070

.loginCentent
  margin-top 10px

.login-form
  border-radius 6px
  background rgba(255, 255, 255, .7)
  // max-width: 480px;
  // min-width: 366px;
  // width: 30%;
  width 360px
  height 430px
  border 2px solid rgba(255, 255, 255, .7)
  box-shadow rgba(0, 0, 0, .5) 3px 3px 20px 5px
  padding 25px 25px 25px 25px
  position absolute
  top 50%
  transform translateY(-50%)
  right 80px

  .el-input
    height 38px

    input
      height 38px

.loginCheck
  display flex
  width 100%
  margin-bottom 15px

.loginCheck img
  vertical-align middle
  margin-right 5px

.PCLogin
  flex 1
  text-align center
  padding 0 30px

.APPLogin
  flex 1
  text-align center
  padding 0 15px

.PC, .APP
  color #083753
  padding-bottom 5px
  border-bottom 1px solid #083753

.dont
  color #9a9a9a

.APPLoad
  width 150px
  display none

.APPLoad p
  padding 10px
  font-size 12px

.android
  text-align center
  height 100%

.ios
  text-align center
  height 100%

.loginImg1, .loginImg2
  width 80px
  height 80px
  display inline-block

.login-tip
  font-size 13px
  text-align center
  color #bfbfbf

.login-code
  width 33%
  height 38px
  float right

  img
    cursor pointer
    vertical-align middle

.imgLayer
  width 100%
  height 100%
  position absolute
  top 0
  left 0
  z-index 100
  background-color rgba(0, 0, 0, .5)

.layer
  width 300px
  height 300px
  float left
  left 0
  right 0
  top 0
  bottom 0
  margin auto

.phoneTab
  cursor pointer
  display inline-block
  flex 1
  padding 6px 0
  text-align center
  margin-bottom 10px

.active
  border-bottom 1px solid #083753

.loading
  height 60px
  margin-right 50px
  cursor pointer
  position relative

.loading:hover
  .APPLoad
    display block
    z-index 10
</style>
