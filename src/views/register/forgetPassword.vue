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
        <div style="font-size: 32px;font-weight: 400;line-height: 80px;">发送验证码重置密码</div>
      </div>
      <div style="width:80%;margin: auto;background: #FFFFFF;padding:20px;">
        <div style="width:430px;margin: auto;">
          <el-form
            ref="form"
            :inline="false"
            :model="form"
          >
            <el-form-item>
              <el-input
                v-model="form.phone"
                placeholder="注册手机号"
              />
            </el-form-item>
            <!-- <el-form-item class="register-item">
              <el-input v-model="form.password" show-password class="register-input-text" placeholder="密码"/>
            </el-form-item>
            <el-form-item class="register-item">
              <el-input v-model="form.password2" show-password class="register-input-text" placeholder="确认密码"/>
            </el-form-item> -->
            <el-form-item>
              <el-input
                v-model="form.phoneVerificationCode"
                style="width:180px"
                placeholder="验证码"
              />
              <el-button
                :disabled="!yzm"
                class="vcode-btn"
                type="primary"
                plain
                @click="getVerificationCode"
              >{{ content }}</el-button>
            </el-form-item>
            <div class="register-item">
              <el-button
                class="submit-btn"
                @click="doSubmit"
              >确定重置</el-button>
            </div>
            <div style="margin-top:60px;width: 100%;text-align: center;">
              <a
                href="/login"
                style="text-decoration: none;color: #00a4ff;font-size: 14px;"
              >返回登录页面></a>
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
import Cookies from 'js-cookie'
import { getForgetPass, checkForgetPass } from '@/api/user'
export default {
  name: 'ForgetPass',
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
      content: '获取验证码', // 按钮里显示的内容
      totalTime: 60, // 记录具体倒计时时间
      yzm: true,
      isRead: false,
      form: {
        //password: null,
        //password2: null,
        phoneVerificationCode: null,
        enabled: 'true',
        phone: null
      }
    }
  },
  created () {

  },
  methods: {
    isvalidPhone (str) {
      const reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/
      return reg.test(str)
    },
    getVerificationCode () {
      if (!this.isvalidPhone(this.form.phone)) {
        this.$message({
          message: '请输入正确的11位手机号码',
          type: 'warning'
        })
        return false
      }
      getForgetPass({ phone: this.form.phone }).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.yzm = false
          var key = setInterval(() => {
            this.totalTime--
            this.content = this.totalTime + 's后重新发送'
            if (this.totalTime <= 0) {
              this.content = '获取验证码'
              this.totalTime = 60
              this.yzm = true
              clearInterval(key)
            }
          }, 1000)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    doSubmit () {
      //   if (this.form.password === null || this.form.password2 === null) {
      //     this.$message({
      //       message: '密码不能为空',
      //       type: 'warning'
      //     })
      //     return false
      //   }
      //   if (this.form.password !== this.form.password2) {
      //     this.$message({
      //       message: '两次密码输入不一致',
      //       type: 'warning'
      //     })
      //     return false
      //   }
      if (this.form.phoneVerificationCode === null || this.form.phoneVerificationCode === '') {
        this.$message({
          message: '请输入验证码',
          type: 'warning'
        })
        return false
      }
      checkForgetPass(this.form).then(res => {
        if (res.code === 200) {
          this.$notify({
            title: res.msg,
            type: 'success',
            duration: 2500
          })
          this.$router.push({ path: '/login' })
        } else {
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
body {
  background: #f5f6f7;
  color: #000;
}
.register {
  .r-header {
    height: 60px;
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: #e5e5e5 1px solid;
  }
  .register-item {
    height: 45px;
    margin-top: 20px;
    span {
      display: inline-block;
      vertical-align: middle;
      max-width: 85%;
      line-height: 1.4;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .register-input-text {
    height: 45px;
    font-size: 14px;
    width: 100%;
  }

  .register-input-text input {
    height: 100%;
    font-size: 14px;
    width: 100%;
  }
  .vcode-btn {
    // border: 1px solid #00a4ff;
    // color: #00a4ff;
    // background-color: #fff;
    width: 208px;
    height: 45px;
    float: right;
    line-height: 43px;
    padding: 0 20px;
    cursor: pointer;
    outline: 0;
    display: inline-block;
    vertical-align: top;
    font-size: 14px;
    &:hover {
      background-color: #00a4ff;
      border: 1px solid #00a4ff;
      color: #fff;
    }
  }
  .submit-btn {
    width: 100%;
    height: 45px;
    border: none;
    margin-bottom: 20px;
    font-size: 14px;
    background-color: #00a4ff;
    color: #fff;
    outline: 0;
    cursor: pointer;
    &:hover {
      background-color: #0097ee;
    }
  }
}
</style>
