<template>
  <div
    style="width: 100%;text-align: center;height: 100%"
    v-loading="loading"
    element-loading-text="正在登录..."
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.8)"
  >
    <!-- 微信扫码成功后，重定向页面 -->
  </div>
</template>
<script>
import { wechatAuth, wechatBind } from '@/api/wechatAuth'
import { setToken, getToken } from '@/utils/auth'
export default {
  data() {
    return {
      loading: true
    }
  },
  created() {
    this.getWechatCode()
  },
  methods: {
    //获取url参数字段
    GetQueryString (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    },
    // 微信登录
    getWechatCode () {
      const code = this.GetQueryString("code")
      this.loading = true
      if (code === null) {
        this.$message.warning('微信授权失败！')
        this.$router.push('/login')
        return;
      } else {
        const data = {
          code: code
        }
        //获取微信openid
        wechatAuth(data).then(res => {
          if (res.code === 200) {
            if (!res.data.authenticationInfo) {
              // 该微信没有账号信息，跳转微信绑定页面
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
              this.$store.dispatch('SetLoadMenus', true)
              this.$store.dispatch('GetVisualToken')
              this.$store.dispatch('GetInfo').then(res => {
                this.$router.push({ path: '/' })
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
            this.$router.push('/login')
          }
        })
      }
    },
  }
}
</script>