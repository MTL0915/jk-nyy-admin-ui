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
        <div style="font-size: 32px;font-weight: 400;line-height: 80px;">注册农语云账号</div>
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
            <el-form-item>
              <el-input
                v-model="form.phone"
                placeholder="常用手机号"
                @blur="checkPhone"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="form.password"
                show-password
                placeholder="密码"
              />
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="form.password2"
                show-password
                placeholder="确认密码"
              />
            </el-form-item>
            <el-form-item>
              <div style="display: flex;">
                <el-input
                  v-model="form.phoneVerificationCode"
                  placeholder="验证码"
                />
                <el-button
                  :disabled="!(yzm && isCheck)"
                  type="primary"
                  plain
                  @click="phoneVerificationCode"
                >{{ content }}</el-button>
              </div>
            </el-form-item>
            <div class="register-item">
              <label>
                <el-checkbox v-model="isRead" />
                <span>我已阅读并同意 <a
                    href="#"
                    style="color: #00a4ff;"
                  >健坤农语云服务协议</a></span>
              </label>
            </div>
            <div class="register-item">
              <el-button
                class="submit-btn"
                @click="doSubmit"
              >同意协议并提交</el-button>
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
import Cookies from 'js-cookie'
import { phoneVerificationCode, phoneRegister, checkPhone } from '@/api/user'
export default {
  name: 'Register',
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
      isCheck: false,
      form: {
        password: null,
        password2: null,
        phoneVerificationCode: null,
        enabled: 'true',
        phone: null
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
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
  created () {

  },
  methods: {
    checkPhone () {
      if (!this.isvalidPhone(this.form.phone)) {
        this.$message({
          message: '请输入正确的11位手机号码',
          type: 'warning'
        })
        this.isCheck = false
        return
      }
      checkPhone({ phone: this.form.phone }).then(res => {
        if (res.code === 200) {
          this.isCheck = true
        } else {
          this.$message.error('该手机号已被注册!')
          this.isCheck = false
        }
      })
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
          this.yzm = false
          //this.form.phoneVerificationCode = res.data
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
          this.$message({
            message: res.msg,
            type: 'warning'
          })
        }
      })
    },
    doSubmit () {
      if (this.isRead === false) {
        this.$message({
          message: '请先阅读并同意 健坤农语云平台服务协议',
          type: 'warning'
        })
        return false
      }
      if (this.form.password === null || this.form.password2 === null) {
        this.$message({
          message: '密码不能为空',
          type: 'warning'
        })
        return false
      }
      if (this.form.password === '123456') {
        this.$message({
          message: '密码过于简单',
          type: 'warning'
        })
        return false
      }
      if (this.form.password !== this.form.password2) {
        this.$message({
          message: '两次密码输入不一致',
          type: 'warning'
        })
        return false
      }
      if (this.form.phoneVerificationCode === null || this.form.phoneVerificationCode === '') {
        this.$message({
          message: '请输入验证码',
          type: 'warning'
        })
        return false
      }
      phoneRegister(this.form).then(res => {
        if (res.code === 200) {
          this.$notify({
            title: '注册成功',
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

<style rel="stylesheet/scss" lang="scss">
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
      max-width: 100%;
      line-height: 1.4;
      font-size: 14px;
      cursor: pointer;
    }
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
