<template>
  <div class="card">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="110px"
    >
      <div class="title">人员档案</div>
      <div
        class="card-content"
        style="padding-bottom:0"
      >
        <el-row :gutter="80">
          <el-col :span="8">
            <el-form-item label="基地名称：">
              <el-select
                v-model="form.basename"
                placeholder="请选择"
              >
                <el-option
                  key="all"
                  label="全部"
                  value="all"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="姓名："
              prop="username"
            >
              <el-input v-model="form.username"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
              label="职位："
              prop="post"
            >
              <el-select
                v-model="form.post"
                placeholder="请选择"
              >
                <el-option
                  key="dsz"
                  label="董事长"
                  value="dsz"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80">
          <el-col :span="8">
            <el-form-item
              label="角色："
              prop="role"
            >
              <el-select
                v-model="form.role"
                placeholder="请选择"
              >
                <el-option
                  key="jdfzr"
                  label="基地负责人"
                  value="jdfzr"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="分配地块：">
              <el-select
                v-model="form.area"
                placeholder="请选择"
              />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="年龄：">
              <div class="flex">
                <el-input v-model="form.age"/><span style="margin-left:5px">岁</span>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80">
          <el-col :span="8">
            <el-form-item label="学历：">
              <el-select
                v-model="form.edu"
                placeholder="请选择"
              >
                <el-option
                  key="bs"
                  label="博士"
                  value="bs"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="从业年限：">
              <div class="flex">
                <el-input v-model="form.wordyear"/><span style="margin-left:5px">年</span>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="荣誉：">
              <el-input v-model="form.honour"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="80">
          <el-col :span="8">
            <el-form-item label="员工卡：">
              <el-select
                v-model="form.card"
                placeholder="请选择"
              >
                <el-option
                  key="none"
                  label="无"
                  value="none"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所属分组：">
              <el-select
                v-model="form.group"
                placeholder="请选择"
              >
                <el-option
                  key="none"
                  label="无"
                  value="none"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="IE版图片：">
          <el-upload
            :file-list="fileList"
            class="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
          >
            <div class="flex">
              <el-button
                size="small"
                type="primary"
              >选择文件</el-button>
              <div
                slot="tip"
                class="el-upload__tip"
              >图片宽高标准：144x144(像素)支持格式：jpg,gif,png,jpeg,bmp,3gp</div>
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="手机版图片：">
          <el-upload
            :file-list="fileList"
            class="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
          >
            <div class="flex">
              <el-button
                size="small"
                type="primary"
              >选择文件</el-button>
              <div
                slot="tip"
                class="el-upload__tip"
              >图片宽高标准：152x92(像素)支持格式：jpg,gif,png,jpeg,bmp,3gp</div>
            </div>
          </el-upload>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="农务感言：">
              <el-input
                v-model="form.speak"
                type="textarea"
                rows="5"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="实践经验介绍：">
              <el-input
                v-model="form.practical"
                type="textarea"
                rows="5"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="title"/>
      <div class="card-content">
        <el-row :gutter="80">
          <el-col>
            <div style="margin-bottom:18px;"><span class="check-label">启用账号：</span>
              <el-checkbox v-model="form.checked"/>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="80">
          <el-col :span="8">
            <el-form-item
              label="用户名："
              prop="phone"
              label-width="80px"
            >
              <el-input v-model="form.phone" placeholder="请将手机号设定为用户名"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Email：" prop="email">
              <el-input v-model="form.email" placeholder="请将手机号设定为用户名"/>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="bottom-btn">
        <el-button
          type="success"
          @click="submitForm (form)"
        >保存</el-button>
        <el-button type="danger">关闭</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'PersonalAdd',
  data() {
    return {
      form: {
        basename: '',
        username: '',
        post: '',
        role: '',
        area: '',
        age: '',
        edu: '',
        wordyear: '',
        honour: '',
        card: '',
        group: '',
        speak: '',
        practical: '',
        checked: true,
        phone: '',
        email: ''
      },
      rules: {
        username: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        post: [{ required: true, message: '请选择职位', trigger: 'change' }],
        role: [{ required: true, message: '请选择角色', trigger: 'change' }],
        phone: [{ pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }],
        email: [{ type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }]
      },
      fileList: [{ name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100' }]
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
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
  padding-bottom 10px
  border-bottom 1px solid #eee
  font-size 14px
  color #666

.card-content
  padding 20px

.el-input
  max-width 215px

.flex
  display flex
  align-items center

.upload >>>
  .el-upload-list
    max-width 150px

  .el-upload__tip
    margin-top 0
    margin-left 50px
    color red

.check-label
  font-size 14px
  color #606266
  padding 0 12px 0 0
</style>
