<template>
  <div class="card">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="95px"
    >
      <div class="title">基本信息</div>
      <div class="card-content">
        <el-row :gutter="80">
          <el-col :span="12">
            <el-form-item
              label="用户名称："
              prop="name"
            >
              <el-input v-model="form.name"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="归属部门："
              prop="depart"
            >
              <el-input v-model="form.depart">
                <el-button
                  slot="append"
                  icon="el-icon-search"
                />
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80">
          <el-col :span="12">
            <el-form-item
              label="手机号码："
              prop="phone"
            >
              <el-input v-model="form.phone"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="邮箱："
              prop="email"
            >
              <el-input v-model="form.email"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80">
          <el-col :span="12">
            <el-form-item
              label="登录账号："
              prop="account"
            >
              <el-input v-model="form.account"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户状态：">
              <el-switch
                v-model="form.state"
                active-color="#1AB394"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80">
          <el-col :span="12">
            <el-form-item label="岗位：">
              <el-input v-model="form.post"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户性别：">
              <el-select
                v-model="form.sex"
                placeholder="请选择"
              >
                <el-option
                  key="man"
                  label="男"
                  value="man"
                />
                <el-option
                  key="women"
                  label="女"
                  value="women"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="角色：">
              <el-radio
                v-model="form.role"
                label="1"
              >管理员</el-radio>
              <el-radio
                v-model="form.role"
                label="2"
              >普通角色</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="title">其他信息</div>
      <div class="card-content">
        <el-form-item label="备注：">
          <el-input
            v-model="form.desc"
            type="textarea"
            rows="5"
          />
        </el-form-item>
      </div>
      <div class="bottom-btn">
        <el-button
          type="success"
          @click="submitForm ()"
        >保存</el-button>
        <el-button type="danger">关闭</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'UserAdd',
  data() {
    return {
      form: {
        name: '',
        depart: '',
        phone: '',
        email: '',
        account: '',
        state: '',
        post: '',
        sex: '',
        role: '1',
        desc: ''
      },
      rules: {
        name: [{ required: true, message: '请输入用户名称', trigger: 'blur' }],
        depart: [{ required: true, message: '请输入归属部门', trigger: 'blur' }],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm() {
      
      this.$refs.form.validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/css/common.styl'

.card
  card()

.title
  color rgb(0, 122, 204)
  padding-bottom 5px
  border-bottom 1px solid #eee

.card-content
  padding 20px

.bottom-btn
  text-align center
</style>

