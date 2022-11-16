<template>
  <div>
    <el-dialog
      :visible.sync="dialogFormVisible"
      append-to-body
      title="修改产品信息"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
      >
        <el-form-item
          :label-width="'120px'"
          label="产品种类："
          prop="category"
        >
          <el-input v-model="form.category" />
        </el-form-item>
        <el-form-item
          :label-width="'120px'"
          label="产品名称："
          prop="name"
        >
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item
          :label-width="'120px'"
          label="产品编号："
          prop="code"
        >
          <el-input v-model="form.code" />
        </el-form-item>
        <el-form-item
          :label-width="'120px'"
          label="显示顺序："
          prop="ord"
        >
          <el-input
            v-model="form.ord"
            @keyup.native="number"
          />
        </el-form-item>
        <el-form-item
          :label-width="'120px'"
          label="产品简介："
          prop="summary"
        >
          <el-input
            v-model="form.summary"
            type="textarea"
            rows="5"
          />
        </el-form-item>
        <el-form-item label="　　　　　图片：">
          <el-upload
            :show-file-list="false"
            :auto-upload="false"
            :on-change="handleImgChange"
            :before-upload="beforeAvatarUpload"
            class="avatar-uploader"
            action="' '"
          >
            <img
              v-if="form.image_url"
              :src="form.image_url"
              class="avatar"
            >
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            />
          </el-upload>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="updateProduct(form)"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getToken } from '@/utils/auth'

export default {
  props: {
    form: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入产品名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入产品编号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handelEdit () {
      this.dialogFormVisible = true
    },
    handleImgChange (file, fl) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        file = null
      }
      if (file) {
        this.form.image_path = file.raw
        this.form.image_url = URL.createObjectURL(file.raw)
      }
    },
    beforeAvatarUpload (file) {
      return false
    },
    number () {
      this.form.ord = this.form.ord.replace(/[^\.\d]/g, '')
      this.form.ord = this.form.ord.replace('.', '')
    },
    updateProduct (form) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // form.hd_product_id = form.id
          // update(form).then(res => {
          //   this.$message.success('修改成功！')
          //   this.$emit('upProductData')
          //   this.$refs.form.resetFields()
          //   this.dialogFormVisible = false
          // })
          let formData = new FormData()
          formData.append('hd_product_id', form.id)
          formData.append('name', form.name)
          formData.append('code', form.code)
          if (form.category) {
            formData.append('category', form.category)
          }
          if (form.ord) {
            formData.append('ord', form.ord)
          }
          if (form.summary) {
            formData.append('summary', form.summary)
          }
          if (form.image_path) {
            formData.append('image_path', form.image_path)
          }
          const config = {
            headers: { 'Content-Type': 'application/form-data', 'Authorization': 'Bearer ' + getToken() }
          }
          this.$axios.post(process.env.BASE_API + '/hd/hd_product/update', formData, config).then(res => {
            if (res.data.code === 200) {
              this.$message.success('修改成功！')
              this.$emit('upProductData')
              this.$refs.form.resetFields()
              this.dialogFormVisible = false
            } else {
              this.$message.error(res.data.msg)
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.el-dialog__wrapper >>>
  .el-dialog
    width 60%

    .el-dialog__header
      background-color #F8F8F8
      padding 10px 15px
      border-bottom 1px solid #eee

      .el-dialog__title
        font-size 16px

    .el-dialog__body
      padding 30px 50px

/* 图片上传 */
.avatar-uploader >>> .el-upload
  border 1px dashed #d9d9d9
  border-radius 6px
  cursor pointer
  position relative
  overflow hidden

  &:hover
    border-color #409eff

.avatar-uploader-icon
  font-size 28px
  color #8c939d
  width 178px
  height 178px
  line-height 178px
  text-align center

.avatar
  width 178px
  height 178px
  display block
</style>
