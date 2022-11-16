<template>
  <!--  自定义模板__ one -->
  <div
    class="loginOne"
    ref="login"
  >
    <div class="loginHeaderOne">
      <div
        class="headerContentOne"
        ref="mainTitle"
      >
        <!--广东省湛江农垦局数字农业建设项目 -->
        {{ mainTitleText }}
      </div>
    </div>

    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
      label-width="0px"
      class="login-form-one"
    >
      <h1
        class="title"
        style="font-size:19px"
      >用户登录</h1>
      <div class="loginTab">
        <div class="typeTab">
          <span
            style="padding:10px"
            :class="currentTab == 'scancode' ? 'active' : ''"
            @click="currentTab = 'scancode'"
          >扫描登录</span>
        </div>
        <div class="typeTab">
          <span
            style="padding:10px"
            :class="currentTab == 'default' ? 'active' : ''"
            @click="currentTab = 'default'"
          >账号登录</span>
        </div>
      </div>
      <!--微信登录-->
      <div
        v-show="currentTab === 'scancode'"
        style="margin-top:30px"
      >
          <div style="heigth:283px;text-align:center;">
            <div  id="login_container"></div>
          </div>
      </div>
      <!--账号登录-->
      <div
        class="loginCentent"
        v-show="currentTab === 'default'"
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
            />
          </div>
        </el-form-item>
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
        <el-form-item style="width:100%;line-height: 40px;margin-bottom:5px;background-color:#5EB0FC;border-radius:20px">
          <el-button
            :loading="loading"
            size="medium"
            type="primary"
            style="width:100%;color:#fff;background-color:#5EB0FC;border:none;height: 40px;border-radius:20px"
            @click.native.prevent="handleLogin"
            id="loginBtn"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>
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
      />
    </div>
  </div>
</template>
<script>
import Config from "@/config";
import { getCodeImg, initIndex } from "@/api/login";
import Cookies from "js-cookie";
//import { mapGetters } from "vuex";

import pclogin from "@/assets/login/pclogin.png";
import pclogin2 from "@/assets/login/pclogin2.png";
import app2 from "@/assets/login/app2.png";
import app1 from "@/assets/login/app1.png";
import html2canvas from "html2canvas";
import { getToken } from "@/utils/auth";

const CURRENT_INDEX = 3;
const CURRENT_INDEX_L = 2;
const flag = false;

export default {
  components: {
    html2canvas
  },
  props: {
    loginConfig: {
      type: Object,
      default: () => { }
    },
    custom_base_id: {
      type: String,
      default: ""
    }
  },
  // computed: {
  //   ...mapGetters(["loginConfig",])
  // },
  name: "Login",
  data () {
    const _this = this;
    return {
      DOMAIN: process.env.DOMAIN,
      currentTab: "scancode",
      codeOpen: false,
      currentIndex: 0,
      codeUrl: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: true,
        code: "",
        uuid: ""
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名不能为空" }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" }
        ],
        code: [{ required: true, trigger: "change", message: "验证码不能为空" }]
      },
      loading: false,
      redirect: undefined,
      mainTitleText: ""
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created () {
    this.getCode();
    this.getCookie();
    // this.getWechatCode();
  },
  mounted () {
    if (this.custom_base_id != "") {
      this.currentTab = "default";
    }
    this.getQrCode();
    let config = null;
    if (Object.keys(this.loginConfig).length > 0) {
      config = this.loginConfig;
    } else {
      config = JSON.parse(localStorage.getItem("loginConfig"));
    }
    //const config = JSON.parse(localStorage.getItem("loginConfig"));
    //const config = this.loginConfig;
    const mainTitle = this.$refs.mainTitle;
    const login = this.$refs.login;
    const loginBtn = document.getElementById("loginBtn");
    for (let i in config.config) {
      config.config[i].cbf_data = JSON.parse(config.config[i].cbf_data);
      if (config.config[i].cff_code == "mainTitle") {
        this.mainTitleText = config.config[i].cbf_data.text;
        mainTitle.style.color = `${config.config[i].cbf_data.color}`;
        mainTitle.style.fontSize = `${config.config[i].cbf_data.fontSize}px`;
        mainTitle.style.backgroundColor = `${config.config[i].cbf_data.backgroundColor
          }`;
        //mainTitle.style.backgroundImage = `url(${config.config[i].cbf_data.backgroundImage})`
      }
      if (config.config[i].cff_code == "background") {
        if (
          Object.keys(config.config[i].cbf_data).length > 0 &&
          (config.config[i].cbf_data.backgroundImage.indexOf("http") > -1 ||
            config.config[i].cbf_data.backgroundImage.indexOf("https") > -1)
        ) {
          login.style.backgroundImage = `url(${config.config[i].cbf_data.backgroundImage
            })`;
          login.style.backgroundRepeat = "no-repeat";
        } else {
          config.config[i].cbf_data.backgroundImage =
            process.env.IMG_URL + config.config[i].cbf_data.backgroundImage;
          login.style.backgroundImage = `url(${config.config[i].cbf_data.backgroundImage
            })`;
          login.style.backgroundRepeat = "no-repeat";
        }
      }
      if (config.config[i].cff_code == "loginColor") {
        loginBtn.style.backgroundColor =
          config.config[i].cbf_data.backgroundColor;
      }
    }
    this.$nextTick(() => {
      if (this.custom_base_id) {
        //封面缩略图
        window.pageYoffset = 0; //网页位置
        document.documentElement.scrollTop = 0; //滚动条的位置
        document.body.scrollTop = 0; //网页被卷去的高
        // 加上面三行代码和setTimeOut是为了解决获取的图片只能获取可视区域内容的坑
        html2canvas(this.$refs.login).then(canvas => {
          var formData = new FormData();
          formData.append("id", this.custom_base_id);
          formData.append(
            "imageFile",
            this.toImgStyle(canvas.toDataURL("image/png"), Date.now() + ".png")
          );
          const config = {
            headers: {
              "Content-Type": "application/form-data",
              Authorization: "Bearer " + getToken()
            }
          };
          this.$axios
            .post(
              process.env.BASE_API + "/custom/base/customBaseCover",
              formData,
              config
            )
            .then(res => { });
        });
      }
    })
  },
  methods: {
    //base64转图片文件方法
    toImgStyle (base64Str, fileName) {
      var arr = base64Str.split(","),
        mime = arr[0].match(/:(.*?);/)[1], //base64解析出来的图片类型
        bstr = atob(arr[1]), //对base64串进行操作，去掉url头，并转换为byte   atob为window内置方法
        len = bstr.length,
        u8arr = new Uint8Array(len); //
      while (len--) {
        u8arr[len] = bstr.charCodeAt(len);
      }
      // 创建新的 File 对象实例[utf-8内容，文件名称或者路径，[可选参数，type：文件中的内容mime类型]]
      return new File([u8arr], fileName, {
        type: mime
      });
    },
    //获取微信登录二维码
    getQrCode () {
      var obj = new WxLogin({
        self_redirect: false,
        id: "login_container",
        appid: "wx0c6862644c7b9e24",
        scope: "snsapi_login",
        // redirect_uri: "http%3A%2F%2Fiot.joinken.cn%2Flogin",
        redirect_uri: "http%3A%2F%2Fiot.joinken.cn%2FwechatLoading",
        state: "state",
        style: "",
        href: "https://" + this.DOMAIN + "/picture/iot/wechat.css"
      });
    },
    // getWechatCode () {
    //   const code = this.GetQueryString("code");
    //   if (code === null) {
    //     this.openid = "";
    //     return;
    //   } else {
    //     const data = {
    //       code: code
    //     };
    //     //获取微信openid
    //     wechatAuth(data).then(res => {
    //       if (res.code === 200) {
    //         if (!res.data.authenticationInfo) {
    //           this.$router.push({
    //             name: "wechatLoginBind",
    //             query: {
    //               bindID: res.data.web.openid
    //             }
    //           });
    //           return;
    //         } else {
    //           //微信登录
    //           setToken(res.data.authenticationInfo.token, false);
    //           this.$store.dispatch(
    //             "SetToken",
    //             res.data.authenticationInfo.token
    //           );
    //           //setUserInfo(res.data.authenticationInfo.user, commit)
    //           // 第一次加载菜单时用到， 具体见 src 目录下的 permission.js
    //           this.$store.dispatch("SetLoadMenus", true);
    //           this.$store.dispatch("GetVisualToken");
    //           this.$store
    //             .dispatch("GetInfo")
    //             .then(res => {
    //               // 无角色无权限，进入到申请（创建）基地的流程
    //               // if (res.data.roles.length == 0) {
    //               //   this.$router.push({ path: '/applyBase' })
    //               // } else {
    //               // initIndex().then(res => { })
    //               this.$router.push({ path: this.redirect || "/" });
    //               // }
    //             })
    //             .catch(err => {
    //               console.log(err);
    //             });
    //         }
    //       } else {
    //         this.$message({
    //           message: "微信授权失败！",
    //           type: "warning"
    //         });
    //         this.openid = "";
    //       }
    //     });
    //   }
    // },
    //获取url参数字段
    // GetQueryString (name) {
    //   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //   var r = window.location.search.substr(1).match(reg);
    //   if (r != null) return unescape(r[2]);
    //   return null;
    // },
    getCode () {
      getCodeImg().then(res => {
        this.codeUrl = "data:image/gif;base64," + res.data.img;
        this.loginForm.uuid = res.data.uuid;
      });
    },
    getCookie () {
      const username = Cookies.get("username");
      let password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      password = password === undefined ? this.loginForm.password : password;
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password,
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
        code: ""
      };
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        const user = this.loginForm;
        if (valid) {
          this.loading = true;
          if (user.rememberMe) {
            Cookies.set("username", user.username, {
              expires: Config.passCookieExpires
            });
            Cookies.set("password", user.password, {
              expires: Config.passCookieExpires
            });
            Cookies.set("rememberMe", user.rememberMe, {
              expires: Config.passCookieExpires
            });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }

          this.$store
            .dispatch("Login", user)
            .then(() => {
              this.loading = false;
              this.$store.dispatch("GetVisualToken");
              this.$store
                .dispatch("GetInfo")
                .then(res => {
                  // 无角色无权限，进入到申请（创建）基地的流程
                  // if (res.data.roles.length == 0) {
                  //   this.$router.push({ path: '/applyBase' })
                  // } else {
                  // initIndex().then(res => { })
                  this.$router.push({ path: this.redirect || "/" });
                  // }
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(res => {
              this.$message.error(res.msg);
              this.loading = false;
              this.getCode();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
    // codeOpen() {
    //   this.codeOpen = true
    // }
  }
};
</script>

<style lang="stylus" scoped>
.loginOne
  // background-image url("../../assets/login/custom2_bg.png")
  background-size cover
  position fixed
  top 0
  left 0
  width 100%
  height 100%

.headerContentOne
  height 60px
  text-align center
  line-height 60px
  color #0068CB
  font-size 45px
  // background rgba(255,255,255, 0.5)
  text-shadow 0 3px 1px #ccc
  font-family '微软雅黑'
  font-weight 700
  margin-top 30px

.loginOne .title
  margin 0px auto 30px auto
  margin-bottom 15px
  text-align center
  color #666

.loginCentent
  margin-top 20px

.login-form-one
  border-radius 6px
  background #fff
  // max-width 360px
  // min-width 360px
  width 360px
  height 400px
  border 2px solid rgba(255, 255, 255, .7)
  box-shadow rgba(0, 0, 0, .5) 3px 3px 20px 5px
  padding 25px 25px 25px 25px
  position absolute
  top 50%
  transform translateY(-50%)
  right 80px

  >>>.el-input
    height 38px

    input
      height 38px

  >>>.el-input__inner
    border-radius 0
    border 0 !important
    border-bottom 1px solid #ccc !important

.loginCheck
  display flex
  width 100%
  margin-bottom 15px

.loginCheck img
  vertical-align middle
  margin-right 5px

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

.active
  color #083753
  border-bottom 1px solid #083753

.loginTab
  display flex

.typeTab
  flex 1
  text-align center
  cursor pointer
  font-size 14px
</style>
