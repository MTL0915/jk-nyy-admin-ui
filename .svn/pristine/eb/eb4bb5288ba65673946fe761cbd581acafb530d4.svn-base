<template>
  <div class="register">
    <div class="r-header">
      <div style="margin-left: 20px;padding-top:5px">
        <a
          href="/login"
          style="font-size:20px;font-weight: 800;color:#000000a6;display: block;margin-left: 10px"
        >
          <img
            src="../../assets/logo/logo3.png"
            style="float:left;display: block;"
          >
          <span style="float:left;display: block;padding-top: 8px;margin-left: 8px;">农语云</span>
        </a>
      </div>
    </div>
    <div style="width: 100%;">
      <div style="width: 100%;text-align: center;">
        <div style="font-size: 32px;font-weight: 400;line-height: 80px;" v-show="type == 'accountBind'">账号绑定</div>
        <div style="font-size: 32px;font-weight: 400;line-height: 80px;" v-show="type == 'phoneBind'">手机号绑定</div>
      </div>
      <div style="width:80%;margin: auto;background: #FFFFFF;padding:20px;">
        <div style="width:430px;margin: auto;">
          <el-form
            ref="form"
            :inline="false"
            :model="form"
            :rules="rules"
            size="small"
          >
            <el-form-item v-show="type == 'accountBind'">
              <el-input
                v-model="form.username"
                placeholder="账号"
              />
            </el-form-item>
            <el-form-item v-show="type == 'accountBind'">
              <el-input
                v-model="form.password"
                show-password
                placeholder="登录密码"
              />
            </el-form-item>
            <el-form-item prop="code" v-show="type == 'accountBind'">
              <el-input
                v-model="form.code"
                auto-complete="off"
                placeholder="请输入验证码"
                style="width: 60%"
              />
              <div class="login-code">
                <img
                  :src="codeUrl"
                  @click="getCode"
                >
              </div>
            </el-form-item>
            <el-form-item v-show="type == 'phoneBind'">
              <el-input
                v-model="form.phone"
                placeholder="常用手机号"
                @blur="checkPhone"
              />
            </el-form-item>
            <el-form-item v-show="type == 'phoneBind'">
              <div style="display: flex;">
                <el-input
                  v-model="form.phoneVerificationCode"
                  placeholder="验证码"
                />
                <el-button
                  type="primary"
                  style="margin-left:5px"
                  plain
                  @click="phoneVerificationCode"
                >{{ content }}</el-button>
              </div>
            </el-form-item>
            <div class="register-item">
              <el-button
                class="submit-btn"
                @click="doSubmit"
              >确定</el-button>
            </div>
            <div style="margin: 15px 0;padding:10px">
              <span class="regist" v-show="type == 'accountBind'" @click="phoneBind">
                农语云账号手机绑定
              </span>
              <span class="regist" v-show="type == 'phoneBind'" @click="accountBind">
                农语云账号密码绑定
              </span>
            </div>
            <div style="margin-top:60px;width: 100%;text-align: center;">
              <a
                href="/login"
                style="text-decoration: none;color: #00a4ff;font-size: 14px;"
              >登录已有农语云账号></a>
            </div>
          </el-form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Config from '@/config'
import { getCodeImg } from '@/api/login'
import { phoneVerificationCode, phoneRegister, checkPhone } from '@/api/user'
import { wechatBind } from '@/api/wechatAuth'
export default {
  data () {
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入电话号码'))
      } else if (!this.isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    return {
      type: "accountBind",
      openid: "",
      content: '获取验证码', // 按钮里显示的内容
      codeUrl: "",
      totalTime: 60, // 记录具体倒计时时间
      form: {
        password: null,
        code: "",
        phoneVerificationCode: null,
        enabled: 'true',
        phone: null,
        username: null,
        uuid: '',
        rememberMe: false
      },
      rules: {
        name: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        phone: [
          { required: true, trigger: 'blur', validator: validPhone }
        ],
        enabled: [
          { required: true, message: '状态不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  mounted () {
    this.openid = this.$route.query.bindID;
    this.getCode()
  },
  methods: {
    getCode () {
      getCodeImg().then(res => {
        this.codeUrl = 'data:image/gif;base64,' + res.data.img
        this.form.uuid = res.data.uuid
      })
    },
    accountBind() {
      this.type = "accountBind";
    },
    phoneBind() {
      this.type = "phoneBind";
    },
    checkPhone () {
      if (!this.isvalidPhone(this.form.phone)) {
        this.$message({
          message: '请输入正确的11位手机号码',
          type: 'warning'
        })
        return
      }
    },
    isvalidPhone (str) {
      const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/
      return reg.test(str)
    },
    phoneVerificationCode () {
      if (!this.isvalidPhone(this.form.phone)) {
        this.$message({
          message: '请输入正确的11位手机号码',
          type: 'warning'
        })
        return false
      }
      phoneVerificationCode({ phone: this.form.phone }).then(res => {
        if (res.code == 200) {
          //this.form.phoneVerificationCode = res.data
          var key = setInterval(() => {
            this.totalTime--
            this.content = this.totalTime + 's后重新发送'

            if (this.totalTime <= 0) {
              this.content = '获取验证码'
              this.totalTime = 60
              clearInterval(key)
            }
          }, 1000)
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      })
    },
    wechat(userId) {
      const data = {
        openid: this.openid,
        user_id: userId
      }
      wechatBind(data).then(res => {
        console.log(res);
      })
    },
    doSubmit () {
      //账号绑定
      if (this.type == 'accountBind') {
        if (this.form.username == '' || this.form.username == null) {
          this.$message({
            message: '账号不能为空',
            type: 'warning'
          })
          return;
        }
        if (this.form.password == '' || this.form.password == null) {
          this.$message({
            message: '密码不能为空',
            type: 'warning'
          })
          return;
        }
        const user = this.form
        this.$store.dispatch('Login', user).then(result => {
          this.wechat(result.data.user.id)
          this.loading = false
          this.$store.dispatch('GetVisualToken')
          this.$store.dispatch('GetInfo').then(res => {
            this.$router.push({ path: this.redirect || '/' })
          }).catch(err => {
            console.log(err)
          })
        }).catch(res => {
          this.$message.error(res.msg)
          this.loading = false
          this.getCode()
        })
      } else if (this.type == 'phoneBind') {
        //手机绑定
        if (this.form.phone == '' || this.form.phone == null) {
          this.$message({
            message: "手机号码不能为空",
            type: "warning"
          })
          return;
        }
        if (this.form.phoneVerificationCode == '' || this.form.phoneVerificationCode == null) {
          this.$message({
            message: "验证码不能为空",
            type: "warning"
          })
          return;
        }
        const user = this.form
        this.$store.dispatch('phone', user).then(result => {
          this.wechat(result.data.user.id)
          this.loading = false
          this.$store.dispatch('GetVisualToken')
          this.$store.dispatch('GetInfo').then(res => {
            this.$router.push({ path: this.redirect || '/' })
          }).catch(err => {
            console.log(err)
          })
        }).catch(res => {
          this.$message.error(res.msg)
          this.loading = false
          this.getCode()
        })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
body
  background #f5f6f7
  color #000
.register
  .r-header
    height 60px
    box-sizing border-box
    background-color #fff
    border-bottom #e5e5e5 1px solid
  .register-item
    height 45px
    margin-top 20px
    span
      display inline-block
      vertical-align middle
      max-width 85%
      line-height 1.4
      font-size 14px
      cursor pointer
  .submit-btn
    width 100%
    height 45px
    border none
    margin-bottom 20px
    font-size 14px
    background-color #00a4ff
    color #fff
    outline 0
    cursor pointer
    &:hover 
      background-color: #0097ee
  .login-code
    width 33%
    height 32px
    float right
    img
      height 100%
      cursor pointer
      vertical-align middle
  .regist
    cursor pointer
    padding 10px 15px
    color #545353
</style>
