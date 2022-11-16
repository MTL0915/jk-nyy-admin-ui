<template>
  <div
    class="login"
    v-loading="loginLoading"
    element-loading-text="加载中..."
  >
  </div>
</template>
<script>
import { initIndex } from '@/api/login'
import Config from '@/config'
import Cookies from 'js-cookie'
import { autoLogin2 } from '@/api/login'
export default {
  data () {
    return {
      loginLoading: true,
      loading: false,
      redirect: undefined,
      token: '',
      username: '',
      password: '',
    }
  },
  created () {
    //this.getCookie();
    if (this.checkNotNull(this.$route.query.token)) {
      this.token = this.$route.query.token
    } else if (this.checkNotNull(this.$route.query.username) && this.checkNotNull(this.$route.query.password)) {
      this.username = this.$route.query.username
      this.password = this.$route.query.password
    } else {
      this.$router.push({ path: '/login' })
    }
  },
  methods: {
    checkNotNull (val) {
      if (val !== undefined && val !== '') {
        return true
      }
      return false
    },
    handleLogin () {
      if (this.username !== '' && this.password !== '') {
        autoLogin2({
          username: this.username,
          password: this.password
        }).then(res => {
          if (res.code === 200) {
            this.token = res.data.token
            this.checkToken()
          } else {
            this.$router.push({ path: '/login' })
          }

        })
      }
      if (this.token) {
        this.checkToken()
      }
    },
    checkToken () {
      this.loading = true
      this.$store.dispatch('autoLogin2', this.token).then(() => {

        this.loading = false
        this.$store.dispatch('GetVisualToken')
        this.$store.dispatch('GetInfo').then(res => {

          // 无角色无权限，进入到申请（创建）基地的流程
          // if (res.data.roles.length == 0) {
          //   this.$router.push({ path: '/applyBase' })
          // } else {
          // initIndex().then(res => { })
          var path = this.$route.query.path;
          if (path) {
            path = path + '?'
            var other = this.$route.query
            Object.keys(other).forEach(function (key) {
              if (key !== 'path' && key !== 'token') {
                console.log(key, other[key]);
                path = path + key + '=' + other[key] + '&'
              }
            });
            this.$router.push({ path: path || '/', query: { basecode: this.$route.query.basecode } })
          } else {
            this.$router.push({ path: this.redirect || '/', query: { basecode: this.$route.query.basecode } })
          }
          // }
        }).catch(err => {
          console.log(err)
        })
      }).catch(res => {
        this.$message.error(res.msg)
        this.loading = false
      })
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    },
    token () {
      this.handleLogin()
    },
    username () {
      this.handleLogin()
    },
    password () {
      this.handleLogin()
    }
  },
}
</script>
<style lang="stylus" scoped>
.login
  // background url('../../assets/login/bg4.jpg')
  // background-size cover
  // display flex
  // flex-direction column
  // align-items flex-end
  height 100%
</style>