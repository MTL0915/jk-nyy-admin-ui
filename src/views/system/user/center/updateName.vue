<template>
  <div style="display: inline-block;">
    <el-dialog
      :visible.sync="dialog"
      :title="title"
      append-to-body
      width="475px"
      @close="cancel"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        size="small"
        label-width="88px"
      >
        <el-form-item
          label="新名称"
          prop="name"
        >
          <el-input
            v-model="form.name"
            auto-complete="on"
            style="width: 320px;"
          />
        </el-form-item>
        <el-form-item
          label="当前密码"
          prop="pass"
        >
          <el-input
            v-model="form.pass"
            type="password"
            style="width: 320px;"
          />
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="text"
          @click="cancel"
        >取消</el-button>
        <el-button
          :loading="loading"
          type="primary"
          @click="doSubmit"
        >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from '@/store'
import { validPass, updateName } from '@/api/user'

export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '' || value === null) {
        callback(new Error('密码不能为空'))
      } else {
        validPass({ password: value }).then(res => {
          if (res.data.status === 200) {
            callback()
          } else {
            callback(new Error('密码错误，请重新输入'))
          }
        })
      }
    }
    const validName = (rule, value, callback) => {
      if (value === '' || value === null) {
        callback(new Error('新名称不能为空'))
      } else if (value === this.name) {
        callback(new Error('新名称不能与旧名称相同'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      dialog: false,
      title: '修改名称',
      form: { pass: '', name: '' },
      codeLoading: false,
      buttonName: '获取验证码', isDisabled: false, time: 60,
      rules: {
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        name: [
          { required: true, validator: validName, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    cancel () {
      this.resetForm()
    },
    doSubmit () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.loading = true
          updateName({ name: this.form.name, password: this.form.pass }).then(res => {
            if (res.code === 200) {
              this.$message.success(res.msg)
            } else {
              this.$message.error(res.msg)
            }
            this.loading = false
            this.resetForm()
            store.dispatch('GetInfo').then(() => { })
          })
        } else {
          return false
        }
      })
    },
    resetForm () {

      this.dialog = false
      this.$refs['form'].resetFields()
      window.clearInterval(this.timer)
      this.time = 60
      this.buttonName = '获取验证码'
      this.isDisabled = false
      this.form = { pass: '', name: '' }
    }
  }
}
</script>

<style scoped>
</style>
